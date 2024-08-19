"use client";

import { useLoggedUser } from "@/lib/context/loggedUser";
import { redirect } from "next/navigation";

const ProfileRedirect = () => {
  const { loggedUser } = useLoggedUser();
  if (loggedUser) {
    redirect("/user/profile");
  }

  return <div className="hidden"></div>;
};
export default ProfileRedirect;
