"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Client } from "appwrite";

interface LoggedUserContextType {
  loggedUser: User | null;
  setLoggedUser: (user: User | null) => void;
}

const LoggedUserContext = createContext<LoggedUserContextType | undefined>(
  undefined,
);
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export const LoggedUserProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUserState] = useState<User | null>(null);

  const setLoggedUser = (user: User | null) => {
    setLoggedUserState(user);
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    }
  };
  useEffect(() => {
    try {
      const cachedUser = localStorage.getItem("loggedUser");
      if (cachedUser) {
        setLoggedUserState(JSON.parse(cachedUser));
      }
    } catch (error) {
      console.error("Failed to initialize user:", error);
    }
  }, []);

  useEffect(() => {
    if (!loggedUser) return;
    const unsubscribe = client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID}.documents.${loggedUser.$id}`,
      (response: any) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update",
          )
        ) {
          const updatedFields: Partial<User> = response.payload;
          const updatedUser: User = {
            ...loggedUser,
            ...updatedFields,
          };
          setLoggedUser(updatedUser);
        }
      },
    );

    return () => {
      unsubscribe();
    };
  }, [loggedUser]);

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export const useLoggedUser = () => {
  const context = useContext(LoggedUserContext);
  if (context === undefined) {
    throw new Error("useLoggedUser must be used within a LoggedUserProvider");
  }
  return context;
};
