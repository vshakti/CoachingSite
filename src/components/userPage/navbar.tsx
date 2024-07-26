import Image from "next/image";
import NavbarOptions from "@/components/userPage/navbarOptions";
import { Buffer } from "buffer";

import {
  BarChart3Icon,
  DumbbellIcon,
  LayoutListIcon,
  MessageSquareIcon,
  UserIcon,
  UsersRoundIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, LogOut } from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";
import { LogOutBtn } from "@/components/userPage/logOutBtn";
import { useUser } from "@/lib/context/user";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/reduxStore";
import { setUser } from "@/lib/redux/reduxSlice";
import { ShowUserPicture } from "@/lib/actions/user.actions";

const Navbar = () => {
  const { user } = useUser();
  const [pic, setPic] = useState("");

  useEffect(() => {
    const fetchPicture = async () => {
      if (user && user.pictureId) {
        try {
          const picture = await ShowUserPicture(user.pictureId);

          setPic(picture);
        } catch (error) {
          console.error("Error fetching user picture:", error);
        }
      }
    };

    fetchPicture();
  }, [user?.pictureUrl]);

  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <div className="flex w-full items-center justify-center gap-x-4 gap-y-1 pb-2 pt-5 md:flex-col md:pl-3">
        <div className="size-[5rem] border md:size-[6rem] 2xl:size-[10rem]">
          {user?.pictureUrl ? (
            <div>
              <Image
                width={40}
                height={40}
                src={pic}
                className="size-20"
                alt=""
              />
            </div>
          ) : (
            <div>num tem</div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4 text-center text-xs font-medium md:w-full md:gap-y-1 md:text-base xl:text-lg 2xl:text-3xl">
          <span className="dark:text-neutral-300">
            {!user ? (
              <div>loading</div>
            ) : (
              <p className="text-3xl text-pink-600 md:text-xl">{user.name}</p>
            )}
          </span>
          <div className="dark:text-neutral-300">
            Coaching: {""}
            <span className="tracking-wide text-green-600 dark:text-green-400">
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="h-px w-3/4 bg-neutral-200 md:ml-3 md:w-full dark:bg-slate-400"></div>

      <ul className="flex w-full items-center justify-between gap-y-6 px-4 py-2.5 md:mt-2 md:grid md:justify-center md:px-0 2xl:gap-y-10">
        <NavbarOptions
          icon={<MessageSquareIcon className="size-5 xl:size-6 2xl:size-8" />}
          text={"Chat"}
        />
        <NavbarOptions
          icon={<UsersRoundIcon className="size-5 xl:size-6 2xl:size-8" />}
          text={"Clients"}
        />
        <NavbarOptions
          icon={<DumbbellIcon className="size-5 xl:size-6 2xl:size-8" />}
          text={"Exercises"}
        />
        <NavbarOptions
          icon={<UserIcon className="size-5 xl:size-6 2xl:size-8" />}
          text={"Profile"}
        />
        <NavbarOptions
          icon={<BarChart3Icon className="size-5 xl:size-6 2xl:size-8" />}
          text={"Progress"}
        />
        <NavbarOptions
          icon={<LayoutListIcon className="size-5 xl:size-6 2xl:size-8" />}
          text={"Templates"}
        />
        <LogOutBtn />
      </ul>
    </div>
  );
};
export default Navbar;
