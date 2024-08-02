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
      aria-disabled={pathname === `/user/${user.$id}/${text.toLowerCase()}`}
      href={`/user/${user.$id}/${text.toLowerCase()}`}
      className={`${pathname === `/user/${user.$id}/${text.toLowerCase()}` ? "pointer-events-none" : ""}`}
      tabIndex={
        pathname === `/user/${user.$id}/${text.toLowerCase()}` ? -1 : undefined
      }
    >
      <div
        className={`${pathname === `/user/${user.$id}/${text.toLowerCase()}` ? "group flex h-8 w-full flex-col items-center justify-start gap-x-1.5 border-b border-violet-500 px-3 py-1 text-white md:flex-row md:gap-x-5 md:border-b-0 lg:gap-x-6 2xl:gap-x-8" : "group flex h-8 w-full cursor-pointer flex-col items-center justify-start gap-x-1.5 rounded-md px-3 py-1 text-white hover:bg-violet-950 md:flex-row md:gap-x-5 lg:gap-x-6 2xl:gap-x-8"} transition-colors`}
      >
        <div
          className={`${pathname === `/user/${user.$id}/${text.toLowerCase()}` ? "text-violet-500" : ""}`}
        >
          {icon}
        </div>
        <span
          className={`${pathname === `/user/${user.$id}/${text.toLowerCase()}` ? "text-violet-500" : ""} hidden text-base font-medium md:block md:text-2xl`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

export default NavbarOptions;
