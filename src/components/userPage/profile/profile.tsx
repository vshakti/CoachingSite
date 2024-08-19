"use client";
import ProfilePicture from "@/components/userPage/profile/profilePicture";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import OpenModalButton from "../openModalButton";
import { PenIcon } from "lucide-react";
import { calculateAge } from "@/constants";
import dynamic from "next/dynamic";
import { useLoggedUser } from "@/lib/context/loggedUser";
import { redirect } from "next/navigation";
const ClientsPicture = dynamic(() => import("./clientsPic"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const UserUpdateModal = dynamic(() => import("./userUpdateModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Profile = () => {
  const { loggedUser } = useLoggedUser();

  if (!loggedUser) {
    redirect("/");
  }

  return (
    <div className="flex w-full flex-col gap-y-2 p-4 antialiased lg:gap-y-4">
      <header className="grid justify-evenly gap-x-2 gap-y-6 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 py-4 md:grid-cols-3">
        <ProfilePicture user={loggedUser!} />
        <div className="flex flex-col items-center justify-center gap-y-6 py-2 pb-2 md:items-start md:justify-start dark:text-neutral-200">
          <div className="flex flex-col gap-y-4">
            <h1 className="flex items-center justify-center text-center text-3xl md:justify-start md:text-start md:text-5xl">
              {loggedUser!.name ? (
                <span className="w-full bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-1">
                  {loggedUser!.name}
                </span>
              ) : (
                <span className="w-full bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-1">
                  {loggedUser!.email}
                </span>
              )}
            </h1>
            <div className="flex flex-col items-center gap-y-4 md:items-start">
              {!loggedUser!.clientStatus ? (
                <></>
              ) : (
                <>
                  {loggedUser!.clientStatus.status === "Active" ? (
                    <span className="w-full bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-1">
                      Coached by {loggedUser!.clientStatus.users.name}
                    </span>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {loggedUser!.clients ? (
                <div className="flex w-full flex-col items-start justify-start bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-1">
                  <div className="flex items-center">
                    {loggedUser!.clients.users
                      .slice(0, 10)
                      .map((coachedUser, index) => (
                        <div key={coachedUser.$id}>
                          <ClientsPicture
                            user={coachedUser}
                            className={`${index === 0 ? "ml-0" : "-ml-6"} `}
                          />
                        </div>
                      ))}
                    {loggedUser!.clients.users.length > 10 && (
                      <div className="-ml-6 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs text-white">
                        +{loggedUser!.clients.users.length - 10}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
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

              {loggedUser!.birthDate ? (
                <span>{calculateAge(loggedUser!.birthDate)}</span>
              ) : (
                <span className="w-full text-center text-slate-600">
                  You have no public age information
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Gender</span>
              {loggedUser!.gender ? (
                <span>{loggedUser!?.gender}</span>
              ) : (
                <span className="w-full text-center text-slate-600">
                  You have no public gender information
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Email</span>
              <span>{loggedUser!?.email}</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Phone</span>
              {loggedUser!.phone ? (
                <span>{loggedUser!?.phone}</span>
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
              {loggedUser!.description ? (
                <span>{loggedUser!?.description}</span>
              ) : (
                <span className="w-full text-center text-slate-600">
                  You have no public bio
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <UserUpdateModal user={loggedUser!} />
    </div>
  );
};

export default Profile;
