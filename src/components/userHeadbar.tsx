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
          <Link
            href={`/user/${user?.$id}/profile`}
            className="rounded-md px-1.5 py-0.5 hover:bg-neutral-100 hover:font-medium dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <p>{user?.name.split(" ")[0]}</p>
          </Link>
          <LogOutBtn />
        </div>
      ) : null}
    </div>
  );
};
