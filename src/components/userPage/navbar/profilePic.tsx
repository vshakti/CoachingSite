"use client";

import { useEffect } from "react";
import Image from "next/image";
import { UserRoundIcon } from "lucide-react";
import { useUserAvatar } from "@/lib/context/userAvatar";

interface ProfilePicProps {
  user: User;
}

const ProfilePic = ({ user }: ProfilePicProps) => {
  const { userAvatar, setUserAvatar } = useUserAvatar();

  useEffect(() => {
    if (user.pictureUrl) {
      const storageKey = `userAvatar_${btoa(user.pictureUrl)}`;
      const cachedAvatar = localStorage.getItem(storageKey);

      if (cachedAvatar) {
        setUserAvatar(cachedAvatar);
      }
    }
  }, [user.pictureUrl, setUserAvatar, userAvatar]);

  return (
    <>
      {userAvatar ? (
        <div
          className={`${user.isCoaching ? "bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-600" : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"} flex size-max items-center justify-center rounded-full p-1`}
        >
          <Image
            height={200}
            width={200}
            quality={100}
            src={userAvatar!}
            className="size-24 rounded-full md:size-32"
            alt="User Avatar"
          />
        </div>
      ) : (
        <div
          className={`${user.isCoaching ? "bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-600" : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"} flex size-max items-center justify-center rounded-full p-1`}
        >
          <UserRoundIcon className="size-24 rounded-full bg-neutral-200 text-neutral-400 md:size-32" />
        </div>
      )}
    </>
  );
};
export default ProfilePic;
