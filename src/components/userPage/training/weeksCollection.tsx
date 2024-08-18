"use client";

import { useTraining } from "@/lib/context/trainingWeek";
import Image from "next/image";
import { useState } from "react";
import OpenModalButton from "../openModalButton";
import { PlayIcon, ForwardIcon } from "lucide-react";
import dynamic from "next/dynamic";
const SendToClientsModal = dynamic(() => import("./sendToClientsModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface WeeksCollectionProps {
  user: User;
}

const WeeksCollection = ({ user }: WeeksCollectionProps) => {
  const { setTrainingWeek } = useTraining();
  const [openClients, setOpenClients] = useState(false);
  const [trainingWeekId, setTrainingWeekId] = useState("");

  return (
    <div className="remove-scrollbar grid h-[220px] grid-cols-3 gap-3 overflow-auto overscroll-contain md:grid-cols-5 lg:grid-cols-7">
      {user.trainingWeek && user.trainingWeek.length > 0 ? (
        <>
          {user.trainingWeek.map((week: any, i) => (
            <div
              key={i}
              className="relative flex w-full flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <div className="flex h-max w-32 flex-col items-center justify-center gap-2">
                <span className="flex w-full items-center justify-center text-center text-sm font-semibold tracking-wide text-cyan-400">
                  {week.name}
                </span>
              </div>
              <button
                onClick={() => {
                  setOpenClients(!openClients);
                }}
                className="flex h-40 w-32 flex-col"
              >
                <div className="flex h-full w-full items-center justify-center rounded-md border border-cyan-400 bg-gradient-to-b from-zinc-950 to-black">
                  <Image
                    src="/logo/icon.png"
                    width={200}
                    height={200}
                    quality={100}
                    alt="nebula logo"
                    className="size-full opacity-85"
                  />
                </div>
                <div className="black h-1.5 w-full rounded-b-md border border-t-0 border-cyan-400"></div>
                <div className="black h-1.5 w-full rounded-b-md border border-t-0 border-cyan-400"></div>
                <div className="black h-1.5 w-full rounded-b-md border border-t-0 border-cyan-400"></div>
              </button>
              {openClients ? (
                <div className="absolute bottom-6 flex h-12 w-24 items-center justify-between">
                  <button
                    onClick={() => {
                      setTrainingWeek(user.trainingWeek[i]);
                    }}
                  >
                    <PlayIcon className="size-8 rounded-full border bg-gradient-to-tl from-slate-950 to-violet-950 p-1 text-white" />
                  </button>
                  {user.clients ? (
                    <OpenModalButton
                      modalId="send_to_clients_modal"
                      onClick={() => {
                        setTrainingWeekId(user.trainingWeek[i].$id);
                      }}
                    >
                      <ForwardIcon className="size-8 rounded-full border bg-gradient-to-tl from-slate-950 to-violet-950 p-1 text-white" />
                    </OpenModalButton>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      ) : (
        <span className="col-span-full w-full text-center text-3xl font-medium">
          You do not have any training templates yet. Go to the exercises
          section to create a week of training.
        </span>
      )}
      <SendToClientsModal trainingWeekId={trainingWeekId} currentUser={user} />
    </div>
  );
};
export default WeeksCollection;
