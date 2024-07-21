import Image from "next/image";
import ProfileOptions from "@/components/profileOptions";

import {
  BarChart3Icon,
  DumbbellIcon,
  LayoutListIcon,
  MessageSquareIcon,
  UserIcon,
  UsersRoundIcon,
} from "lucide-react";
import Profile from "@/components/profile";

const userDashboard = async () => {
  return (
    <div className="grid h-screen w-full grid-cols-6">
      <div className="col-span-2 flex h-full flex-col items-center border-r border-neutral-200 md:col-span-1 2xl:gap-y-3 dark:border-neutral-200 dark:bg-neutral-900">
        <div className="flex w-full flex-col items-center justify-center gap-y-1 pb-2 pt-5">
          <div className="relative size-[5rem] md:size-[6rem] 2xl:size-[10rem]">
            <Image
              className="rounded-full border-2 border-neutral-800 dark:border-white"
              src="/hero-users/user-1.png"
              alt="profile image"
              layout="fill"
              quality={100}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center text-center text-xs font-medium md:text-base xl:text-lg 2xl:text-3xl">
            <span className="dark:text-neutral-300">Ayk the Great</span>
            <div className="dark:text-neutral-300">
              Coaching: {""}
              <span className="tracking-wide text-green-600 dark:text-green-400">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        <div className="h-px w-3/4 bg-neutral-200 dark:bg-slate-400"></div>

        <ul className="mt-2 grid w-full items-center justify-center gap-y-6 py-2.5 2xl:gap-y-10">
          <ProfileOptions
            icon={<MessageSquareIcon className="size-5 xl:size-6 2xl:size-8" />}
            text={"Chat"}
          />
          <ProfileOptions
            icon={<UsersRoundIcon className="size-5 xl:size-6 2xl:size-8" />}
            text={"Clients"}
          />
          <ProfileOptions
            icon={<DumbbellIcon className="size-5 xl:size-6 2xl:size-8" />}
            text={"Exercises"}
          />
          <ProfileOptions
            icon={<UserIcon className="size-5 xl:size-6 2xl:size-8" />}
            text={"Profile"}
          />
          <ProfileOptions
            icon={<BarChart3Icon className="size-5 xl:size-6 2xl:size-8" />}
            text={"Progress"}
          />
          <ProfileOptions
            icon={<LayoutListIcon className="size-5 xl:size-6 2xl:size-8" />}
            text={"Templates"}
          />
        </ul>
      </div>
      <div className="col-span-4 h-full w-full md:col-span-5 dark:bg-neutral-800 dark:text-neutral-300">
        <Profile />
      </div>
    </div>
  );
};
export default userDashboard;
