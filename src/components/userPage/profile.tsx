"use client";

import UserForm from "../forms/userForm";
import ProfilePicture from "./profilePicture";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useUser } from "@/lib/context/user";
import { UserFormDefaultValues } from "@/constants";

const Profile = () => {
  const { user } = useUser();
  const [userStats, setUserStats] = useState({
    userName: UserFormDefaultValues.name,
    userGender: UserFormDefaultValues.gender,
    userEmail: UserFormDefaultValues.email,
    userPhone: UserFormDefaultValues.gender,
    userDescription: UserFormDefaultValues.description,
  });
  const [userAge, setUserAge] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const newUser = await getLoggedInUser();

        if (!newUser) {
          router.push(`/`);
        } else {
          setUserStats({
            userName: newUser.name,
            userGender: newUser.gender,
            userEmail: newUser.gender,
            userPhone: newUser.phone,
            userDescription: newUser.description,
          });
          calculateAge(newUser.birthDate);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [router]);

  function calculateAge(birthday: Date | undefined) {
    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setUserAge(age);
    }
  }

  return (
    <div className="flex w-full flex-col gap-y-4 text-neutral-600 antialiased">
      <header className="grid justify-evenly gap-y-6 border-b-2 px-4 py-4 pb-10 md:grid-cols-3">
        <ProfilePicture />
        <div className="flex flex-col items-center justify-center gap-y-6 py-2 md:items-start md:justify-start dark:text-neutral-200">
          <div className="flex flex-col gap-y-4">
            <h1 className="flex items-center justify-center text-center text-3xl md:justify-start md:text-start md:text-5xl">
              {userStats.userName}
            </h1>
            <div className="flex flex-col items-center gap-y-4 md:items-start">
              Amigos: [Array de Amigos]{" "}
              <span>Clientes: [Array de Clientes]</span>
            </div>
          </div>

          <div className="md:hidden">EDITAR PROFILE</div>
        </div>
        <button className="hidden md:block dark:text-neutral-200">
          EDITAR PROFILE
        </button>
      </header>

      <div className="grid grid-cols-2 grid-rows-1 md:grid-cols-3">
        <div className="flex items-center justify-center p-2">
          <ul className="flex h-full w-full flex-col justify-center gap-y-6 rounded-lg border border-neutral-200 p-4 text-xs font-medium shadow-md shadow-neutral-400 md:w-2/3 md:text-xl dark:border-neutral-700 dark:text-neutral-200 dark:shadow-black">
            <div className="flex flex-col space-y-1 border-b border-neutral-700/15 pb-1 tracking-wide">
              <span>Age</span>
              <span>{userAge}</span>
            </div>

            <div className="flex flex-col space-y-1 border-b border-neutral-700/15 pb-1 tracking-wide">
              <span>Gender</span>
              <span>{userStats.userGender}</span>
            </div>

            <div className="flex flex-col space-y-1 border-b border-neutral-700/15 pb-1 tracking-wide">
              <span>Email</span>
              <span>{user?.email}</span>
            </div>

            <div className="flex flex-col space-y-1 border-b border-neutral-700/15 pb-1 tracking-wide">
              <span>Phone</span>
              <span>{userStats.userPhone}</span>
            </div>
          </ul>
        </div>

        <div className="row-span-1 flex items-center justify-start p-2 md:col-span-2 md:col-start-2 md:items-start">
          <div className="flex h-full w-full flex-col gap-y-4 rounded-lg border border-neutral-200 p-4 text-xs font-medium shadow-md shadow-neutral-400 md:w-1/2 md:text-xl dark:border-neutral-700 dark:text-neutral-200 dark:shadow-black">
            <div className="flex flex-col">
              <span>Bio</span>
              <span>{userStats.userDescription}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
