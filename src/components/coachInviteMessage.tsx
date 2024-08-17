"use client";

import { useState } from "react";
import DenyCoachingButton from "./denyCoachingButton";
import AcceptCoachingButton from "./acceptCoachingButton";

interface UserProps {
  user: User;
}

export const CoachInviteMessage = ({ user }: UserProps) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {!user ? (
        <></>
      ) : (
        <>
          {user.clientStatus &&
          user.clientStatus.status === "Pending" &&
          user.clientStatus.users ? (
            <div
              className={`${!open ? "hidden" : ""} fixed inset-0 z-[100] flex items-center justify-center overscroll-none bg-black/75 backdrop-blur-sm`}
            >
              <div
                className={`rounded-lg border border-slate-700 bg-zinc-950 p-1 py-4 text-white`}
              >
                <div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-gradient-to-r from-transparent via-violet-950 to-transparent px-8 py-1">
                      <span className="text-cyan-500">
                        {user.clientStatus.users.name ? (
                          <>{user.clientStatus.users.name}</>
                        ) : (
                          <>{user.clientStatus.users.email}</>
                        )}
                      </span>{" "}
                      invited you to be his client, do you accept?
                    </div>
                    <div className="flex w-full flex-row items-center justify-evenly">
                      <AcceptCoachingButton
                        className="bg-gradient-to-r from-transparent via-violet-950 to-transparent px-8 py-2 hover:via-violet-900"
                        setOpen={setOpen}
                        user={user}
                      />
                      <DenyCoachingButton
                        className="bg-gradient-to-r from-transparent via-violet-950 to-transparent px-8 py-2 hover:via-violet-900"
                        setOpen={setOpen}
                        user={user}
                      />
                    </div>
                    <button
                      className="flex w-full items-center justify-end px-3 text-xs text-slate-600"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      Answer later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
export default CoachInviteMessage;
