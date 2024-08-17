"use client";

import { ShowUserPicture } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserRoundIcon } from "lucide-react";

interface ClientsPictureProps {
  className?: string;
  user: User;
}

const ClientsPicture = ({ className, user }: ClientsPictureProps) => {
  const [avatarPic, setAvatarPic] = useState("");
  useEffect(() => {
    const avatar = async (user: User) => {
      const base64String = await ShowUserPicture(user.pictureUrl);
      const newAvatar = `data:image/png;base64,${base64String}`;
      setAvatarPic(newAvatar);
    };
    avatar(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {avatarPic ? (
        <div
          className={`${user.isCoaching ? "bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-600" : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"} flex size-max items-center justify-center rounded-full p-0.5 ${className}`}
        >
          <Image
            height={200}
            width={200}
            quality={100}
            src={avatarPic!}
            className="size-10 rounded-full md:size-12"
            alt="User Avatar"
          />
        </div>
      ) : (
        <div
          className={`${user.isCoaching ? "bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-600" : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"} flex size-max items-center justify-center rounded-full p-0.5 ${className}`}
        >
          <UserRoundIcon className="size-10 rounded-full bg-neutral-200 text-neutral-400 md:size-12" />
        </div>
      )}
    </>
  );
};
export default ClientsPicture;
