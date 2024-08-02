import { XIcon } from "lucide-react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import ExerciseUpdateForm from "@/components/forms/exerciseUpdateForm";

interface ExerciseUpdateProps {
  exercise: Exercise | undefined;
}

const ExerciseUpdateModal = ({ exercise }: ExerciseUpdateProps) => {
  return (
    <dialog id="exercise_update_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="flex h-max w-max flex-col rounded-md border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex w-full flex-row items-center justify-between text-neutral-800 dark:text-neutral-200">
            <h2 className="w-max text-xl font-medium md:text-3xl">
              {exercise && (
                <>
                  <span className="text-cyan-500">
                    {exercise.name.toUpperCase()}
                  </span>
                </>
              )}
            </h2>
            <form method="dialog">
              <button className="flex items-center justify-center">
                <XIcon className="md:size-10" />
              </button>
            </form>
          </div>
          <ExerciseUpdateForm exercise={exercise} />
        </div>
      </div>
    </dialog>
  );
};

export default ExerciseUpdateModal;
