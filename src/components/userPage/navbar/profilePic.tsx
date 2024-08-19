"use client";

import { useEffect } from "react";
import Image from "next/image";
import { UserRoundIcon } from "lucide-react";
import { useUserAvatar } from "@/lib/context/userAvatar";
import { useLoggedUser } from "@/lib/context/loggedUser";

const ProfilePic = () => {
  const { userAvatar, setUserAvatar } = useUserAvatar();
  const { loggedUser } = useLoggedUser();

  useEffect(() => {
    if (loggedUser && loggedUser.pictureUrl) {
      const storageKey = `userAvatar_${btoa(loggedUser.pictureUrl)}`;
      const cachedAvatar = localStorage.getItem(storageKey);

      if (cachedAvatar) {
        setUserAvatar(cachedAvatar);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser!.pictureUrl, setUserAvatar, userAvatar]);

  return (
    <>
      {userAvatar && loggedUser ? (
        <div
          className={`${loggedUser.isCoaching ? "bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-600" : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"} flex size-max items-center justify-center rounded-full p-1`}
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
          className={`${loggedUser!.isCoaching ? "bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-600" : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"} flex size-max items-center justify-center rounded-full p-1`}
        >
          <UserRoundIcon className="size-24 rounded-full bg-neutral-200 text-neutral-400 md:size-32" />
        </div>
      )}
    </>
  );
};
export default ProfilePic;
