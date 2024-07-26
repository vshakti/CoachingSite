"use client";

import Navbar from "@/components/userPage/navbar";
import Profile from "@/components/userPage/profile";
import { getLoggedInUser } from "@/lib/actions/user.actions";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { UserProvider } from "@/lib/context/user";
import { Provider } from "react-redux";
import store from "@/lib/redux/reduxStore";

const UserControlPanel = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const newUser = await getLoggedInUser();

        if (!newUser) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [router]);

  return (
    <Provider store={store}>
      <UserProvider>
        <div className="flex h-full items-center justify-center">
          <Profile />
        </div>
      </UserProvider>
    </Provider>
  );
};
export default UserControlPanel;
