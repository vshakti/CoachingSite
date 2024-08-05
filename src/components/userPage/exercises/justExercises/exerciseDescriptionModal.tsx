import { XIcon } from "lucide-react";

interface ExerciseDescriptionProps {
  exerciseDescription: string;
}

const ExerciseDescriptionModal = ({
  exerciseDescription,
}: ExerciseDescriptionProps) => {
  return (
    <dialog id="exercise_description_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 text-white backdrop-blur-sm">
        <div className="mr-2.5 flex max-h-[420px] max-w-[640px] flex-col gap-y-4 rounded-md border border-white bg-gradient-to-b from-slate-950 via-gray-950 to-slate-950 p-4 md:mr-0">
          <div className="flex flex-row items-center justify-between">
            <div className="text-xl font-medium md:text-3xl">EXERCISE CUES</div>
            <form method="dialog">
              <button className="flex items-center justify-end">
                <XIcon className="size-8 md:size-10" />
              </button>
            </form>
          </div>

          <p className="remove-scrollbar min-h-72 min-w-96 overflow-auto rounded-lg border border-slate-700 bg-slate-950 p-2 antialiased">
            {exerciseDescription}
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default ExerciseDescriptionModal;
