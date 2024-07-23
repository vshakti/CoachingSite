"use client";

import Navbar from "@/components/navbar";
import Profile from "@/components/profile";
import { getLoggedInUser } from "@/lib/actions/user.actions";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";

const UserControlPanel = () => {
  const [showNavbar, setShowNavbar] = useState("SHOW");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const newUser = await getLoggedInUser();
        setUser(newUser);

        if (!newUser) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div
      className={`grid h-screen w-full ${showNavbar === "SHOW" ? "grid-cols-6" : ""}`}
    >
      <div
        className={`relative ${showNavbar === "HIDE" ? "hidden" : ""} col-span-2 flex h-full flex-row justify-center md:col-span-1 2xl:gap-y-3 dark:bg-neutral-900`}
      >
        {showNavbar === "SHOW" ? <Navbar showNavbar={`${showNavbar}`} /> : null}
      </div>
      <div
        className={`${showNavbar === "SHOW" ? "col-span-4" : ""} relative h-full w-full gap-x-2 md:col-span-5 dark:bg-neutral-800 dark:text-neutral-300`}
      >
        <div className="absolute flex h-full w-3 items-center border-r border-neutral-200 md:w-6 dark:bg-neutral-900">
          {showNavbar === "HIDE" ? (
            <button
              onClick={() => {
                setShowNavbar("SHOW");
              }}
              className="text-neutral-900 dark:text-zinc-200"
            >
              <ChevronRightIcon className="size-3 md:size-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setShowNavbar("HIDE");
              }}
              className="text-neutral-900 dark:text-zinc-200"
            >
              <ChevronLeftIcon className="size-3 md:size-5" />
            </button>
          )}
        </div>
        <Profile />
      </div>
    </div>
  );
};
export default UserControlPanel;
