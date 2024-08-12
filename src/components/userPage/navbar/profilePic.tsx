"use client";

import { ShowUserPicture } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ProfilePicProps {
  user: User;
}

const ProfilePic = ({ user }: ProfilePicProps) => {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (user.pictureUrl) {
        try {
          // Generate a unique key based on the picture URL
          const storageKey = `userAvatar_${btoa(user.pictureUrl)}`;

          // Check if the image data is already in localStorage
          const cachedAvatar = localStorage.getItem(storageKey);

          if (cachedAvatar) {
            // Use the cached data if available
            setUserAvatar(cachedAvatar);
          } else {
            // Fetch the image data if not cached
            const base64String = await ShowUserPicture(user.pictureUrl);
            const newAvatar = `data:image/png;base64,${base64String}`;

            // Store the fetched data in localStorage
            localStorage.setItem(storageKey, newAvatar);

            // Update state with the fetched data
            setUserAvatar(newAvatar);
          }
        } catch (error) {
          console.error("Error fetching or converting image:", error);
        }
      }
    }

    fetchData();
  }, [user.pictureUrl]);

  return (
    <Image
      height={200}
      width={200}
      quality={100}
      src={userAvatar! || ``}
      className="bg-center"
      alt="User Avatar"
    />
  );
};
export default ProfilePic;
