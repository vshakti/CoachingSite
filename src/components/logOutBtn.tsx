import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "@/lib/actions/user.actions";

export const LogOutBtn = () => {
  const router = useRouter();

  const handleLogOut = () => {
    LogOut();
    router.push(`/sign-in`);
  };

  return (
    <div className="bg-red-500">
      <button onClick={handleLogOut}>sair</button>
    </div>
  );
};
