"use client";

import { acceptCoachingInvite } from "@/lib/actions/user.actions";
import { CheckIcon } from "lucide-react";

interface UserProps {
  user: User;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}

const AcceptCoachingButton = ({ user, setOpen, className }: UserProps) => {
  const denyInvite = async () => {
    try {
      setOpen(false);
      if (user) {
        const status = "Active";

        const newUser = await acceptCoachingInvite(
          user.clientStatus.$id,
          status,
          user.clientStatus.users,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={className} onClick={denyInvite}>
      <CheckIcon className="size-10" />
    </button>
  );
};
export default AcceptCoachingButton;
