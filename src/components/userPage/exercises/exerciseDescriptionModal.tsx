import { XIcon } from "lucide-react";

interface ExerciseDescriptionProps {
  exerciseDescription: string;
}

const ExerciseDescriptionModal = ({
  exerciseDescription,
}: ExerciseDescriptionProps) => {
  return (
    <dialog id="exercise_description_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="mr-2.5 flex max-h-[420px] max-w-[640px] flex-col gap-y-4 rounded-md border border-neutral-300 bg-neutral-50 p-4 md:mr-0 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex flex-row items-center justify-between">
            <div className="text-xl font-medium text-neutral-800 md:text-3xl dark:text-neutral-200">
              EXERCISE QUEUES
            </div>
            <form method="dialog">
              <button className="flex items-center justify-end">
                <XIcon className="size-8 text-neutral-800 md:size-10 dark:text-neutral-200" />
              </button>
            </form>
          </div>

          <p className="remove-scrollbar min-h-72 min-w-96 overflow-auto rounded-lg border border-neutral-300/30 p-2 text-neutral-800 antialiased dark:border-neutral-500/10 dark:text-neutral-300">
            {exerciseDescription}
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default ExerciseDescriptionModal;
