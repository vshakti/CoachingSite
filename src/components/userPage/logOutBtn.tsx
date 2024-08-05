"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "@/lib/actions/user.actions";
import { LogOutIcon } from "lucide-react";

export const LogOutBtn = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    await LogOut();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogOut}
      className="flex items-center justify-center rounded-md p-1 text-white hover:bg-violet-900"
    >
      <LogOutIcon className="size-4 md:size-5" />
    </button>
  );
};
