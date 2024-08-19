import ExerciseCreationForm from "@/components/forms/exerciseCreationForm";
import { XIcon } from "lucide-react";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const ExerciseCreationModal = () => {
  return (
    <dialog id="exercise_creation_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="flex h-max w-max flex-col gap-y-4 rounded-md border border-slate-400 bg-gradient-to-b from-slate-950 via-violet-950 to-slate-950 p-4">
          <div className="flex w-full flex-row items-center justify-between text-white">
            <h2 className="w-max text-xl font-medium md:text-3xl">
              EXERCISE CREATION
            </h2>
            <form method="dialog">
              <button className="flex items-center justify-center">
                <XIcon className="md:size-10" />
              </button>
            </form>
          </div>
          <ExerciseCreationForm />
        </div>
      </div>
    </dialog>
  );
};

export default ExerciseCreationModal;
