import UserForm from "@/components/forms/userForm";
import { XIcon } from "lucide-react";

const UserUpdateModal = () => {
  return (
    <dialog id="user_update_modal" className="modal">
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/25 backdrop-blur-sm">
        <div className="h-max w-max rounded-md border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
          <form method="dialog">
            <button className="flex w-full items-center justify-end">
              <XIcon className="text-neutral-800 dark:text-neutral-200" />
            </button>
          </form>
          <UserForm />;
        </div>
      </div>
    </dialog>
  );
};

export default UserUpdateModal;
