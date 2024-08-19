"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Client } from "appwrite";
import { getLoggedInUser } from "../actions/user.actions";

interface LoggedUserContextType {
  loggedUser: User | null;
  setLoggedUser: (user: User | null) => void;
  cleanUser: () => void;
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
    const initUser = async () => {
      const cachedUser = localStorage.getItem("loggedUser");
      if (cachedUser) {
        setLoggedUserState(JSON.parse(cachedUser));
      } else {
        const user = await getLoggedInUser();
        setLoggedUser(user);
      }
    };
    initUser();
  }, []);

  const cleanUser = () => {
    setLoggedUserState(null);
    localStorage.removeItem("loggedUser");
  };

  useEffect(() => {
    if (loggedUser) {
      const unsubscribe = client.subscribe(
        `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID}.documents.${loggedUser.$id}`,
        (response: any) => {
          const updatedFields: Partial<User> = response.payload;

          setLoggedUser((prevUser: User) => {
            if (!prevUser) return null;

            const updatedUser: User = {
              ...prevUser,
              ...updatedFields,
            };

            return updatedUser;
          });
        },
      );

      return () => {
        unsubscribe();
      };
    }
  }, [loggedUser]);

  return (
    <LoggedUserContext.Provider
      value={{ loggedUser, setLoggedUser, cleanUser }}
    >
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
