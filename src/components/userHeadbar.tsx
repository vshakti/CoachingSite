import Link from "next/link";
import { getLoggedInUser, LogOut } from "@/lib/actions/user.actions";
import { LogOutIcon } from "lucide-react";
import { LogOutBtn } from "./userPage/logOutBtn";

export const UserHeadbar = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  return (
    <div>
      {user ? (
        <div className="flex flex-row gap-x-1">
          <p className="font-medium tracking-wide text-neutral-800 antialiased dark:text-neutral-200">
            {user?.name.split(" ")[0]}
          </p>

          <LogOutBtn />
        </div>
      ) : null}
    </div>
  );
};
