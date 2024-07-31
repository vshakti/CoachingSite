"use client";

import { useState, ReactNode } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react";

const NavbarLayout = ({ children }: { children: ReactNode }) => {
  const [showNavbar, setShowNavbar] = useState("HIDE");

  return (
    <div
      className={`md:h-screen ${showNavbar === "SHOW" ? "flex flex-col md:flex-row" : ""} sticky inset-x-0 top-14 z-[99] h-full w-full transition-all md:fixed md:w-fit`}
    >
      <div
        className={`relative ${showNavbar === "HIDE" ? "hidden" : ""} col-span-2 flex h-full flex-row justify-center md:col-span-1 2xl:gap-y-3`}
      >
        {showNavbar === "SHOW" ? (
          <div className="flex flex-col bg-neutral-50/75 backdrop-blur-lg md:bg-white md:pl-4 dark:bg-neutral-900/75 md:dark:bg-neutral-900">
            {children}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`${showNavbar === "SHOW" ? "flex-row bg-neutral-50/75 backdrop-blur-lg md:bg-neutral-100 dark:bg-neutral-900/75 md:dark:bg-neutral-900" : "bg-white/75 backdrop-blur-lg md:bg-neutral-100 dark:bg-neutral-900/75 md:dark:bg-neutral-900"} flex h-8 w-full items-center border-b border-neutral-300 shadow-bottom-only backdrop-blur-lg transition-all sm:border-r-0 md:h-full md:w-6 md:border-b-0 md:border-r md:shadow-right-only dark:shadow-bottom-only-dark md:dark:shadow-right-only-dark`}
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
  );
};
export default NavbarLayout;
