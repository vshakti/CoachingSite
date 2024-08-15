"use client";

import { denyCoachingInvite } from "@/lib/actions/user.actions";
import { BanIcon } from "lucide-react";

interface UserProps {
  user: User;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}

const DenyCoachingButton = ({ user, setOpen, className }: UserProps) => {
  const denyInvite = async () => {
    try {
      setOpen(false);
      if (user) {
        const status = "Inactive";

        const newUser = await denyCoachingInvite(user.clientStatus.$id, status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={className} onClick={denyInvite}>
      <BanIcon className="size-10" />
    </button>
  );
};
export default DenyCoachingButton;
