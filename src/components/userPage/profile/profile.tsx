import ProfilePicture from "@/components/userPage/profile/profilePicture";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import UserUpdateModal from "./userUpdateModal";
import OpenModalButton from "../openModalButton";
import { PenIcon } from "lucide-react";
import { calculateAge } from "@/constants";

const Profile = async () => {
  const userResponse = await getLoggedInUser();
  const user: User = userResponse;

  return (
    <div className="flex w-full flex-col gap-y-2 p-4 antialiased lg:gap-y-4">
      <header className="grid justify-evenly gap-x-2 gap-y-6 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 py-4 md:grid-cols-3">
        <ProfilePicture user={user} />
        <div className="flex flex-col items-center justify-center gap-y-6 py-2 pb-2 md:items-start md:justify-start dark:text-neutral-200">
          <div className="flex flex-col gap-y-4">
            <h1 className="flex items-center justify-center text-center text-3xl md:justify-start md:text-start md:text-5xl">
              {user.name ? <>{user.name}</> : <>{user.email}</>}
            </h1>
            <div className="flex flex-col items-center gap-y-4 md:items-start">
              Amigos: [Array de Amigos]{" "}
              <span>Clientes: [Array de Clientes]</span>
            </div>
          </div>

          <OpenModalButton
            modalId="user_update_modal"
            className="rounded-md bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-8 py-2 font-medium hover:via-cyan-500 md:hidden"
          >
            <div className="flex flex-row gap-x-2 text-neutral-100">
              <PenIcon />
              <span>EDIT PROFILE</span>
            </div>
          </OpenModalButton>
        </div>

        <div className="flex items-center justify-center">
          <OpenModalButton
            modalId="user_update_modal"
            className="hidden rounded-md bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-8 py-2 font-medium hover:via-cyan-500 md:block"
          >
            <div className="flex flex-row gap-x-2 text-neutral-100">
              <PenIcon />
              <span>EDIT PROFILE</span>
            </div>
          </OpenModalButton>
        </div>
      </header>

      <div className="grid grid-rows-1 rounded-t-3xl px-4 lg:grid-cols-2 lg:py-8">
        <div className="flex items-center justify-center p-2">
          <ul className="flex h-full w-full flex-col justify-start gap-y-6 p-4 text-xs font-medium text-white md:w-2/3 md:text-xl">
            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Age</span>

              {user.birthDate ? (
                <span>{calculateAge(user.birthDate)}</span>
              ) : (
                <span className="w-full text-center text-slate-600">
                  You have no public age information
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Gender</span>
              {user.gender ? (
                <span>{user?.gender}</span>
              ) : (
                <span className="w-full text-center text-slate-600">
                  You have no public gender information
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Email</span>
              <span>{user?.email}</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Phone</span>
              {user.phone ? (
                <span>{user?.phone}</span>
              ) : (
                <span className="w-full text-center text-slate-600">
                  You have no public phone information
                </span>
              )}
            </div>
          </ul>
        </div>

        <div className="row-span-1 flex items-center justify-start p-2 text-white md:items-start">
          <div className="flex h-full w-full flex-col gap-y-4 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 p-2 px-4 text-xs font-medium md:text-xl">
            <div className="flex flex-col items-center justify-center">
              <span>Bio</span>
              {user.description ? (
                <span>{user?.description}</span>
              ) : (
                <span className="w-full text-center text-slate-600">
                  You have no public bio
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <UserUpdateModal user={user} />
    </div>
  );
};

export default Profile;
