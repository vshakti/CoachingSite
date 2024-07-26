"use client";

import Navbar from "@/components/userPage/navbar";
import { UserProvider } from "@/lib/context/user";
import { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showNavbar, setShowNavbar] = useState("HIDE");

  return (
    <UserProvider>
      <div className="flex flex-col md:flex-row">
        <div
          className={`md:h-screen ${showNavbar === "SHOW" ? "flex flex-col md:flex-row" : ""} sticky inset-x-0 top-14 z-[99] w-full bg-neutral-50/75 backdrop-blur-lg transition-all md:w-fit dark:bg-neutral-900/75`}
        >
          <div
            className={`relative ${showNavbar === "HIDE" ? "hidden" : ""} col-span-2 flex h-full flex-row justify-center md:col-span-1 2xl:gap-y-3 dark:bg-neutral-900/75`}
          >
            {showNavbar === "SHOW" ? <Navbar /> : null}
          </div>

          <div
            className={`${showNavbar === "SHOW" ? "flex-row" : ""} shadow-bottom-only dark:shadow-bottom-only-dark flex h-8 w-full items-center border-b border-neutral-300 sm:border-r-0 md:h-full md:w-6 md:border-b-0 md:border-r md:shadow-right-only dark:bg-neutral-900 md:dark:shadow-right-only-dark`}
          >
            <div className="flex w-full items-center justify-center md:hidden">
              {showNavbar === "HIDE" ? (
                <button
                  onClick={() => {
                    setShowNavbar("SHOW");
                  }}
                  className="text-neutral-900 dark:text-zinc-200"
                >
                  <ChevronDownIcon className="size-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowNavbar("HIDE");
                  }}
                  className="text-neutral-900 dark:text-zinc-200"
                >
                  <ChevronUpIcon className="size-5" />
                </button>
              )}
            </div>
            <div className="hidden md:block">
              {showNavbar === "HIDE" ? (
                <button
                  onClick={() => {
                    setShowNavbar("SHOW");
                  }}
                  className="text-neutral-900 dark:text-zinc-200"
                >
                  <ChevronRightIcon className="size-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowNavbar("HIDE");
                  }}
                  className="text-neutral-900 dark:text-zinc-200"
                >
                  <ChevronLeftIcon className="size-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full bg-neutral-50 md:h-screen dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
