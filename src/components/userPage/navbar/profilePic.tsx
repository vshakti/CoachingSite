"use client";

import { ShowUserPicture } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserRoundIcon } from "lucide-react";
import { useUserAvatar } from "@/lib/context/userAvatar";

interface ProfilePicProps {
  user: User;
}

const ProfilePic = ({ user }: ProfilePicProps) => {
  const { userAvatar, setUserAvatar } = useUserAvatar();

  return (
    <>
      {!userAvatar ? (
        <div className="flex h-max w-max items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-600 p-1">
          <UserRoundIcon className="size-32 rounded-full bg-neutral-200 text-neutral-400" />
        </div>
      ) : (
        <Image
          height={200}
          width={200}
          quality={100}
          src={userAvatar!}
          className="bg-center"
          alt="User Avatar"
        />
      )}
    </>
  );
};
export default ProfilePic;
