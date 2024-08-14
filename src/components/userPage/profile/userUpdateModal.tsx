import UserForm from "@/components/forms/userForm";
import { XIcon } from "lucide-react";

interface UserProps {
  user: User;
}

const UserUpdateModal = ({ user }: UserProps) => {
  return (
    <dialog id="user_update_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="h-max w-max rounded-md border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
          <form method="dialog">
            <button className="flex w-full items-center justify-end">
              <XIcon className="text-neutral-800 dark:text-neutral-200" />
            </button>
          </form>
          <UserForm user={user} />
        </div>
      </div>
    </dialog>
  );
};

export default UserUpdateModal;
