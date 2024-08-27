"use client";
import { useState } from "react";
import ClientsPicture from "../profile/clientsPic";
import dynamic from "next/dynamic";
import { useTrackingExerciseContext } from "@/lib/context/exerciseTracking";
import { useLoggedUser } from "@/lib/context/loggedUser";
const CoachedUserProgressionModal = dynamic(
  () => import("./coachedUserProgressionModal"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

const CoachedUsersList = () => {
  const { setTrackedExercise } = useTrackingExerciseContext();
  const [coachedUser, setCoachedUser] = useState<User>();
  const { loggedUser } = useLoggedUser();
  const selectCoachedUser = async (coachedUser: User) => {
    setTrackedExercise({
      exerciseProgression: [],
      exerciseName: "",
      exerciseId: "",
    });
    const user = await coachedUser;
    setCoachedUser(user);
    const dialog = document.getElementById(
      "coached_user_progression_modal",
    ) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };
  return (
    <div>
      <>
        {loggedUser!.clients ? (
          <>
            {loggedUser!.clients.users
              .sort((a, b) => {
                const nameA = a.name || a.email;
                const nameB = b.name || b.email;
                return nameA.localeCompare(nameB);
              })
              .map((coachedUser) => (
                <button
                  onClick={() => {
                    selectCoachedUser(coachedUser);
                  }}
                  key={coachedUser.userId}
                  className="flex w-max flex-col items-center justify-center gap-2 bg-gradient-to-r from-transparent via-zinc-950 to-transparent px-4 py-1.5 text-white antialiased transition-all hover:scale-105 hover:via-cyan-500"
                >
                  <ClientsPicture user={coachedUser} />
                  {coachedUser.name ? (
                    <>{coachedUser.name}</>
                  ) : (
                    <>{coachedUser.email}</>
                  )}
                </button>
              ))}
          </>
        ) : (
          <></>
        )}
      </>
      <CoachedUserProgressionModal user={coachedUser!} />
    </div>
  );
};
export default CoachedUsersList;
