"use client";
import { useUser } from "@/lib/context/user";

import { useRouter } from "next/navigation";

export const UserHeadbar = () => {
  const { user } = useUser();
  const router = useRouter();

  return <div>{user ? <p>{user?.name}</p> : null}</div>;
};
