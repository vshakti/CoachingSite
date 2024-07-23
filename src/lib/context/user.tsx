// "use client";
// import { ID } from "node-appwrite";
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { account } from "@/lib/appwrite.config";
// import { useRouter } from "next/navigation";

// interface UserContextProps {
//   current: User | null;
//   login: (params: UserAuth) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (params: UserAuth) => Promise<void>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// }

// interface UserProviderProps {
//   children: ReactNode;
// }

// export function UserProvider({ children }: UserProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   async function login({ email, password }: UserAuth) {
//     const loggedIn = await account.createEmailPasswordSession(email, password);
//     console.log("User logged in", loggedIn.$id);
//     router.push(`/user/${loggedIn.$id}`);
//   }

//   async function logout() {
//     await account.deleteSession("current");
//     setUser(null);
//     router.push("/");
//   }

//   async function register({ email, password }: UserAuth) {
//     await account.create(ID.unique(), email, password, undefined);
//     await login({ email, password });
//   }

//   async function init() {
//     try {
//       const loggedIn = await account.get();
//       setUser(loggedIn);
//     } catch (err) {
//       setUser(null);
//     }
//   }

//   useEffect(() => {
//     init();
//   }, []);

//   return (
//     <UserContext.Provider value={{ current: user, login, logout, register }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
