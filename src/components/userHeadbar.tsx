"use client";
import { useUser } from "@/lib/context/user";
import Link from "next/link";

import { useRouter } from "next/navigation";

export const UserHeadbar = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div>
      {user ? (
        <Link href={`/user/${user?.$id}`}>
          <p>{user?.name}</p>
        </Link>
      ) : null}
    </div>
  );
};
