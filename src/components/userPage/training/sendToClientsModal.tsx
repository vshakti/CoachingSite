"use client";

import { ForwardIcon, LoaderIcon, XIcon } from "lucide-react";
import ClientsPicture from "../profile/clientsPic";
import { SendTrainingWeek } from "@/lib/actions/user.actions";
import { useState } from "react";

interface SendWeekProps {
  trainingWeekId: string;
  currentUser: User;
}

const SendToClientsModal = ({ currentUser, trainingWeekId }: SendWeekProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = () => {
    const dialog = document.getElementById(
      "send_to_clients_modal",
    ) as HTMLDialogElement;

    if (dialog) {
      dialog.close();
    }
  };

  const sendWeek = async (coachedUser: User) => {
    try {
      setIsLoading(true);
      const userId = await coachedUser.userId;

      const newWeek = await SendTrainingWeek(trainingWeekId, userId!);

      if (!newWeek) {
        throw Error;
      } else {
        handleModalClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="send_to_clients_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="flex h-max max-w-[480px] flex-col gap-y-4 rounded-md border border-slate-400 bg-gradient-to-b from-slate-950 via-violet-950 to-slate-950 p-4">
          <div className="flex w-full flex-row items-center justify-between gap-8 text-white">
            <h2 className="w-max text-xl font-medium md:text-3xl">
              Send to your clients
            </h2>
            <button
              className="flex items-center justify-center"
              onClick={handleModalClose}
            >
              <XIcon className="md:size-10" />
            </button>
          </div>
          <div className="grid w-full">
            {currentUser.clients ? (
              <>
                {currentUser.clients.users
                  .sort((a, b) => {
                    const nameA = a.name || a.email;
                    const nameB = b.name || b.email;
                    return nameA.localeCompare(nameB);
                  })
                  .map((coachedUser) => (
                    <div
                      key={coachedUser.userId}
                      className="flex w-max flex-row items-center justify-center gap-2 rounded-full bg-gradient-to-r from-transparent via-slate-950 to-gray-950 pr-3 text-white antialiased shadow-sm shadow-slate-800 transition-all hover:scale-105"
                    >
                      <ClientsPicture user={coachedUser} />
                      {coachedUser.name ? (
                        <>{coachedUser.name}</>
                      ) : (
                        <>{coachedUser.email}</>
                      )}
                      <div className="h-6 w-px bg-white" />
                      <button
                        disabled={isLoading}
                        onClick={() => {
                          sendWeek(coachedUser);
                        }}
                      >
                        {!isLoading ? (
                          <ForwardIcon className="hover:text-cyan-500" />
                        ) : (
                          <LoaderIcon className="animate-spin" />
                        )}
                      </button>
                    </div>
                  ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default SendToClientsModal;
