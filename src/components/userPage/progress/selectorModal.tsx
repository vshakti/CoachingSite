import { useTrackingExerciseContext } from "@/lib/context/exerciseTracking";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface SelectorModalProps {
  user: User;
}

const SelectorModal = ({ user }: SelectorModalProps) => {
  const { setTrackedExercise } = useTrackingExerciseContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filteredList = user.progressionList
    .filter((item) =>
      item.exerciseName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => a.exerciseName.localeCompare(b.exerciseName));

  return (
    <dialog id="select_tracked_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 text-white antialiased backdrop-blur-sm">
        <div className="absolute left-1/4 top-32 flex h-96 w-96 flex-col gap-2 rounded-md border border-slate-700 bg-slate-950 p-3 text-3xl">
          <div className="flex items-center justify-between">
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search exercise..."
                className="mb-2 w-full rounded-md border border-slate-700 bg-transparent p-1 text-lg focus:ring-0"
              />
            </div>
            <form method="dialog">
              <button>
                <XIcon className="size-8" />
              </button>
            </form>
          </div>
          <div className="remove-scrollbar overflow-auto overscroll-contain">
            {filteredList.length > 0 &&
              filteredList
                .sort((a, b) => a.exerciseName.localeCompare(b.exerciseName))
                .map((list, i) => (
                  <>
                    <button
                      className="w-full truncate"
                      onClick={() => {
                        setTrackedExercise(list);
                        const dialog = document.getElementById(
                          "select_tracked_modal",
                        ) as HTMLDialogElement;

                        if (dialog) {
                          dialog.close();
                        }
                      }}
                    >
                      {list.exerciseName}
                    </button>
                    {/* {list.exerciseProgression.map((progression, p) => (
                <>{progression.trainingDay}</>
              ))} */}
                  </>
                ))}
          </div>
        </div>
        ) : (<></>)
      </div>
    </dialog>
  );
};
export default SelectorModal;
