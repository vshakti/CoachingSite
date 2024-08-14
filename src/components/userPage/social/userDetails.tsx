"use client";

import { calculateAge } from "@/constants";
import { useUser } from "@/lib/context/user";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MessageSquareMoreIcon,
  UserRoundIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface UserDetailsProps {
  userImages: { [key: string]: string };
}

const UserDetails = ({ userImages }: UserDetailsProps) => {
  const { user } = useUser();
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {user ? (
        <div className="relative flex h-full w-full flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setShowDetails(!showDetails);
            }}
            className={`absolute ${!showDetails ? "top-8" : "top-0"} left-4`}
          >
            {!showDetails ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </button>
          {showDetails ? (
            <>
              <div className="flex flex-col items-center gap-2">
                {!user.pictureUrl || !userImages[user.$id!] ? (
                  <div
                    className={`${
                      user.isCoaching
                        ? "bg-gradient-to-br from-cyan-500 via-indigo-800 to-cyan-500"
                        : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"
                    } flex w-max items-center justify-center rounded-full p-0.5`}
                  >
                    <UserRoundIcon className="size-28 rounded-full bg-neutral-200 text-neutral-400" />
                  </div>
                ) : (
                  <div
                    className={`${
                      user.isCoaching
                        ? "bg-gradient-to-br from-cyan-500 via-indigo-800 to-cyan-500"
                        : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"
                    } flex w-max items-center justify-center rounded-full p-0.5`}
                  >
                    <Image
                      height={48}
                      width={48}
                      quality={100}
                      src={userImages[user.$id!]}
                      className="size-28 rounded-full bg-center"
                      alt="User Avatar"
                    />
                  </div>
                )}
                {user.name ? (
                  <span
                    className={`${user.isCoaching ? "text-cyan-500" : "text-white"} bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 px-4 text-center text-lg font-medium md:px-7 md:text-2xl xl:px-10 xl:text-4xl`}
                  >
                    {user.name}
                  </span>
                ) : (
                  <span
                    className={`${user.isCoaching ? "text-cyan-500" : "text-white"} bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 px-4 text-lg font-medium md:px-7 md:text-2xl xl:px-10 xl:text-4xl`}
                  >
                    {user.email}
                  </span>
                )}
                <MessageSquareMoreIcon className="size-10 hover:text-cyan-500" />
              </div>
              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-col items-center justify-center gap-0.5 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-1 text-base tracking-wide">
                  <span className="text-slate-600">Age</span>
                  {user.birthDate ? (
                    <span>{calculateAge(user.birthDate)}</span>
                  ) : (
                    <span className="text-sm">
                      No public information avaliable
                    </span>
                  )}
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-0.5 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-1 text-base tracking-wide">
                  <span className="text-slate-600">Gender</span>
                  {user.gender ? (
                    <span>{user.gender}</span>
                  ) : (
                    <span className="text-sm">
                      No public information avaliable
                    </span>
                  )}
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-0.5 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-1 text-base tracking-wide">
                  <span className="text-slate-600">Email</span>
                  <span>{user.email}</span>
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-0.5 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-1 text-base tracking-wide">
                  <span className="text-slate-600">Phone</span>
                  {user.phone ? (
                    <span>{user.phone}</span>
                  ) : (
                    <span className="text-sm">
                      No public information avaliable
                    </span>
                  )}
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-0.5 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-1 text-base tracking-wide">
                  <span className="text-slate-600">Bio</span>
                  {user.description ? (
                    <span className="remove-scrollbar max-h-40 overflow-auto px-1 text-base">
                      {user.description}
                    </span>
                  ) : (
                    <span className="text-sm">
                      No public information avaliable
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row items-center gap-2">
                {!user.pictureUrl || !userImages[user.$id!] ? (
                  <div
                    className={`${
                      user.isCoaching
                        ? "bg-gradient-to-br from-cyan-500 via-indigo-800 to-cyan-500"
                        : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"
                    } flex w-max items-center justify-center rounded-full p-0.5`}
                  >
                    <UserRoundIcon className="size-20 rounded-full bg-neutral-200 text-neutral-400" />
                  </div>
                ) : (
                  <div
                    className={`${
                      user.isCoaching
                        ? "bg-gradient-to-br from-cyan-500 via-indigo-800 to-cyan-500"
                        : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"
                    } flex w-max items-center justify-center rounded-full p-0.5`}
                  >
                    <Image
                      height={48}
                      width={48}
                      quality={100}
                      src={userImages[user.$id!]}
                      className="size-20 rounded-full bg-center"
                      alt="User Avatar"
                    />
                  </div>
                )}
                {user.name ? (
                  <span
                    className={`${user.isCoaching ? "text-cyan-500" : "text-white"} bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 px-4 text-center text-lg font-medium md:px-7 md:text-2xl xl:px-10 xl:text-4xl`}
                  >
                    {user.name}
                  </span>
                ) : (
                  <span
                    className={`${user.isCoaching ? "text-cyan-500" : "text-white"} bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 px-4 text-lg font-medium md:px-7 md:text-2xl xl:px-10 xl:text-4xl`}
                  >
                    {user.email}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <>sem</>
      )}
    </div>
  );
};
export default UserDetails;
