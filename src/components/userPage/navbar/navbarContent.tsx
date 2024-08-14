import { getLoggedInUser, ShowUserPicture } from "@/lib/actions/user.actions";
import Image from "next/image";
import IsCoachingForm from "../../forms/isCoachingForm";
import NavbarOptions from "@/components/userPage/navbar/navbarOptions";
import {
  BarChart3Icon,
  DumbbellIcon,
  LayoutListIcon,
  MessageSquareIcon,
  UserIcon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react";
import React from "react";
import ProfilePic from "./profilePic";

const NavbarContent = async () => {
  const userResponse = await getLoggedInUser();
  const user: User = userResponse;

  return (
    <div>
      <div className="flex w-screen items-center justify-center gap-x-10 gap-y-1 pb-2 pt-5 md:w-full md:flex-col md:pl-3">
        <div className="size-[6rem] md:size-[9rem] 2xl:size-[10rem]">
          {user?.pictureUrl ? (
            <div className="size-max">
              <ProfilePic user={user} />
            </div>
          ) : (
            <div
              className={`${user.isCoaching ? "bg-gradient-to-br from-cyan-500 via-indigo-800 to-cyan-500" : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"} flex size-max items-center justify-center rounded-full p-1`}
            >
              <UserRoundIcon className="size-24 rounded-full bg-neutral-200 text-neutral-400 md:size-32" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4 text-center text-xs font-medium md:w-full md:gap-y-1 md:text-base xl:text-lg 2xl:text-2xl">
          <span className="text-white">
            {!user ? (
              <div>loading</div>
            ) : (
              <p className="text-3xl tracking-wider text-white md:text-xl">
                {user.name ? <>{user.name}</> : <>{user.email}</>}
              </p>
            )}
          </span>

          <IsCoachingForm user={user} />
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-y-2">
        <ul className="flex w-full items-center justify-between gap-y-6 px-3 py-2.5 md:mt-2 md:grid md:justify-center md:px-0 2xl:gap-y-10">
          <NavbarOptions
            user={user}
            icon={<MessageSquareIcon className="size-5 md:size-7 2xl:size-8" />}
            text={"Chat"}
          />

          <NavbarOptions
            user={user}
            icon={<UsersRoundIcon className="size-5 md:size-7 2xl:size-8" />}
            text={"Social"}
          />

          <NavbarOptions
            user={user}
            icon={<DumbbellIcon className="size-5 md:size-7 2xl:size-8" />}
            text={"Exercises"}
          />

          <NavbarOptions
            user={user}
            icon={<UserIcon className="size-5 md:size-7 2xl:size-8" />}
            text={"Profile"}
          />

          <NavbarOptions
            user={user}
            icon={<BarChart3Icon className="size-5 md:size-7 2xl:size-8" />}
            text={"Progress"}
          />

          <NavbarOptions
            user={user}
            icon={<LayoutListIcon className="size-5 md:size-7 2xl:size-8" />}
            text={"Training"}
          />
        </ul>
      </div>
    </div>
  );
};

export default NavbarContent;
