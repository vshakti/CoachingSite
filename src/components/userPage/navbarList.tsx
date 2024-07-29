import NavbarOptions from "@/components/userPage/navbarOptions";
import {
  BarChart3Icon,
  DumbbellIcon,
  LayoutListIcon,
  MessageSquareIcon,
  UserIcon,
  UsersRoundIcon,
} from "lucide-react";
import React from "react";

const NavbarList = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <div className="h-px w-3/4 bg-neutral-200 md:ml-3 md:w-full dark:bg-slate-400"></div>

      <ul className="flex w-full items-center justify-between gap-y-6 px-4 py-2.5 md:mt-2 md:grid md:justify-center md:px-0 2xl:gap-y-10">
        <NavbarOptions
          icon={<MessageSquareIcon className="size-5 md:size-7 2xl:size-8" />}
          text={"Chat"}
        />
        <NavbarOptions
          icon={<UsersRoundIcon className="size-5 md:size-7 2xl:size-8" />}
          text={"Clients"}
        />
        <NavbarOptions
          icon={<DumbbellIcon className="size-5 md:size-7 2xl:size-8" />}
          text={"Exercises"}
        />
        <NavbarOptions
          icon={<UserIcon className="size-5 md:size-7 2xl:size-8" />}
          text={"Profile"}
        />
        <NavbarOptions
          icon={<BarChart3Icon className="size-5 md:size-7 2xl:size-8" />}
          text={"Progress"}
        />
        <NavbarOptions
          icon={<LayoutListIcon className="size-5 md:size-7 2xl:size-8" />}
          text={"Templates"}
        />
      </ul>
    </div>
  );
};
export default NavbarList;
