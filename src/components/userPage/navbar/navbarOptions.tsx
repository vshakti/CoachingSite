"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavbarOptionsProps = {
  icon: React.ReactNode;
  text: string;
  user: User;
};

const NavbarOptions: React.FC<NavbarOptionsProps> = ({
  icon,
  text,
  user,
}: NavbarOptionsProps) => {
  const pathname = usePathname();

  return (
    <Link
      aria-disabled={pathname === `/user/${text.toLowerCase()}`}
      href={`/user/${text.toLowerCase()}`}
      className={`${pathname === `/user/${text.toLowerCase()}` ? "pointer-events-none" : ""}`}
      tabIndex={pathname === `/user/${text.toLowerCase()}` ? -1 : undefined}
    >
      <div
        className={`${pathname === `/user/${text.toLowerCase()}` ? "group flex h-8 w-full flex-col items-center justify-start gap-x-1.5 px-3 py-1 text-cyan-500 md:flex-row md:gap-x-5 lg:gap-x-6 2xl:gap-x-8" : "group flex h-8 w-full cursor-pointer flex-col items-center justify-start gap-x-1.5 rounded-md bg-gradient-to-r px-3 py-1 text-white hover:from-violet-900/0 hover:via-violet-900 hover:to-violet-900/0 md:flex-row md:gap-x-5 lg:gap-x-6 2xl:gap-x-8"} transition-colors`}
      >
        <div
          className={`${pathname === `/user/${text.toLowerCase()}` ? "" : ""}`}
        >
          {icon}
        </div>
        <span
          className={`${pathname === `/user/${text.toLowerCase()}` ? "" : ""} hidden text-base font-medium md:block md:text-2xl`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

export default NavbarOptions;
