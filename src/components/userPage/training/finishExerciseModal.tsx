"use client";
import CompleteExerciseForm from "@/components/forms/completeExerciseForm";
import { XIcon } from "lucide-react";

interface FinishExerciseProps {
  exerciseName: string;
  exerciseId: string;
}

const FinishExerciseModal = ({
  exerciseName,
  exerciseId,
}: FinishExerciseProps) => {
  return (
    <dialog id="finish_exercise_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="flex h-max w-max flex-col gap-y-4 rounded-md border border-slate-400 bg-gradient-to-b from-slate-950 via-violet-950 to-slate-950 p-4">
          <div className="flex w-full flex-row items-center justify-between text-white">
            <h2 className="w-max text-xl font-medium text-yellow-400 md:text-3xl">
              {exerciseName}
            </h2>
            <form method="dialog">
              <button className="flex items-center justify-center">
                <XIcon className="md:size-10" />
              </button>
            </form>
          </div>
          <CompleteExerciseForm
            exerciseId={exerciseId}
            exerciseName={exerciseName}
          />
        </div>
      </div>
    </dialog>
  );
};

export default FinishExerciseModal;
