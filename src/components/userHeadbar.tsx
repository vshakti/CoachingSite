"use client";

import { LogOutBtn } from "./logOutBtn";
import { useLoggedUser } from "@/lib/context/loggedUser";

export const UserHeadbar = () => {
  const { loggedUser } = useLoggedUser();

  return (
    <div>
      {loggedUser ? (
        <div className="flex flex-row items-center gap-x-1">
          <p className="font-medium tracking-wide text-white antialiased">
            {loggedUser.name ? (
              <>{loggedUser?.name.split(" ")[0]}</>
            ) : (
              <>{loggedUser.email}</>
            )}
          </p>

          <LogOutBtn />
        </div>
      ) : null}
    </div>
  );
};
