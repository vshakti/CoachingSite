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
          <div className="flex flex-col bg-gradient-to-b from-gray-950/75 via-gray-950/75 to-zinc-950/75 backdrop-blur-lg md:bg-gradient-to-r md:from-zinc-950 md:via-neutral-950 md:to-zinc-950 md:pl-4">
            {children}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`${showNavbar === "SHOW" ? "flex-row bg-zinc-950/75 backdrop-blur-lg md:bg-zinc-950" : "bg-zinc-950/75 backdrop-blur-lg"} flex h-8 w-full items-center border-b border-neutral-300 shadow-bottom-only-dark transition-all sm:border-r-0 md:h-full md:w-6 md:border-b-0 md:border-r md:shadow-right-only-dark`}
      >
        <div className="flex w-full items-center justify-center md:hidden">
          {showNavbar === "HIDE" ? (
            <button
              onClick={() => {
                setShowNavbar("SHOW");
              }}
              className="text-yellow-400"
            >
              <ChevronDownIcon className="size-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setShowNavbar("HIDE");
              }}
              className="text-yellow-400"
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
              className="text-yellow-400"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setShowNavbar("HIDE");
              }}
              className="text-yellow-400"
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
