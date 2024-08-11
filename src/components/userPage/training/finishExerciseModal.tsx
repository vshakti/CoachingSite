"use client";
import CompleteExerciseForm from "@/components/forms/completeExerciseForm";
import { XIcon } from "lucide-react";
import { useRef } from "react";

interface FinishExerciseProps {
  exerciseName: string;
  user: User;
  exerciseId: string;
}

const FinishExerciseModal = ({
  exerciseName,
  user,
  exerciseId,
}: FinishExerciseProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleModalClose = () => {
    const dialog = document.getElementById(
      "finish_exercise_modal",
    ) as HTMLDialogElement;

    if (formRef.current) {
      formRef.current.reset();
    }

    if (dialog) {
      dialog.close();
    }
  };

  return (
    <dialog id="finish_exercise_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="flex h-max w-max flex-col gap-y-4 rounded-md border border-slate-400 bg-gradient-to-b from-slate-950 via-violet-950 to-slate-950 p-4">
          <div className="flex w-full flex-row items-center justify-between text-white">
            <h2 className="w-max text-xl font-medium text-cyan-500 md:text-3xl">
              {exerciseName}
            </h2>
            <button
              className="flex items-center justify-center"
              onClick={handleModalClose}
            >
              <XIcon className="md:size-10" />
            </button>
          </div>
          <CompleteExerciseForm
            ref={formRef}
            exerciseId={exerciseId}
            user={user}
            exerciseName={exerciseName}
            onReset={handleModalClose}
          />
        </div>
      </div>
    </dialog>
  );
};

export default FinishExerciseModal;
