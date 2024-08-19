"use client";

import { useState, useMemo } from "react";
import { UserRoundIcon } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/lib/context/user";
import { useLoggedUser } from "@/lib/context/loggedUser";
import { redirect } from "next/navigation";

interface UserSearchProps {
  allUsers: User[];
  userImages: { [key: string]: string };
}

const UserSearch = ({ allUsers, userImages }: UserSearchProps) => {
  const { setUser } = useUser();
  const { loggedUser } = useLoggedUser();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    return allUsers
      .filter(
        (user) =>
          (user.name && user.name.toLowerCase().includes(lowercasedQuery)) ||
          user.email.toLowerCase().includes(lowercasedQuery),
      )
      .filter((user) => user.$id !== loggedUser!.$id);
  }, [searchQuery, allUsers, loggedUser]);

  if (!loggedUser) {
    redirect("/");
  }

  return (
    <div className="relative w-full text-white">
      <input
        type="text"
        placeholder="Search all users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded bg-transparent p-2"
      />
      {filteredUsers.length > 0 ? (
        <div className="remove-scrollbar absolute top-12 z-[99] max-h-96 w-full grid-flow-row overflow-auto rounded-b-lg border border-t-0 border-cyan-500 bg-gradient-to-r from-zinc-950/75 via-violet-950/75 to-zinc-950/75 backdrop-blur-sm md:ml-2 lg:ml-0">
          {filteredUsers.map((user) => (
            <button
              onClick={() => {
                setUser(user);
                setSearchQuery("");
              }}
              key={user.$id}
              className="px-3 py-2 hover:bg-gradient-to-r hover:from-zinc-950/0 hover:via-violet-950 hover:to-zinc-950/0"
            >
              <div className="flex items-center gap-2">
                {!user.pictureUrl || !userImages[user.$id!] ? (
                  <div
                    className={`${
                      user.isCoaching
                        ? "bg-gradient-to-br from-cyan-500 via-indigo-800 to-cyan-500"
                        : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"
                    } flex items-center justify-center rounded-full p-0.5`}
                  >
                    <UserRoundIcon className="size-6 rounded-full bg-neutral-200 text-neutral-400 md:size-10" />
                  </div>
                ) : (
                  <div
                    className={`${
                      user.isCoaching
                        ? "bg-gradient-to-br from-cyan-500 via-indigo-800 to-cyan-500"
                        : "bg-gradient-to-br from-yellow-600 via-violet-900 to-yellow-600"
                    } flex items-center justify-center rounded-full p-0.5`}
                  >
                    <Image
                      height={48}
                      width={48}
                      quality={100}
                      src={userImages[user.$id!]}
                      className="size-6 rounded-full bg-center md:size-10"
                      alt="User Avatar"
                    />
                  </div>
                )}
                {user.name ? (
                  <span
                    className={`${user.isCoaching ? "text-cyan-500" : "text-white"} w-max truncate`}
                  >
                    {user.name}
                  </span>
                ) : (
                  <span
                    className={`${user.isCoaching ? "text-cyan-500" : "text-white"} w-max truncate`}
                  >
                    {user.email}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserSearch;
