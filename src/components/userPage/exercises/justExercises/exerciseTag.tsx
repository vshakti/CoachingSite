import { BookOpenIcon, PlayIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import ExerciseVideoModal from "./exerciseVideoModal";
import { useState } from "react";
import ExerciseUpdateModal from "./exerciseUpdatingModal";
import ExerciseDescriptionModal from "./exerciseDescriptionModal";
import { DeleteExercise } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/toast";

interface ShowToastParams {
  message: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "action";
}

interface ExerciseTagProps {
  user: User;
  searchFunction?: (exercise: Exercise) => boolean;
  filterFunction?: (exercise: Exercise) => boolean;
}

interface ExerciseTagCoordProps {
  children: React.ReactNode;
  exercise?: Exercise;
  className: string;
}

const Piece = ({ children, className }: ExerciseTagCoordProps) => {
  return (
    <div draggable="false" className={className}>
      {children}
    </div>
  );
};

const ExerciseTag: React.FC<ExerciseTagProps> = ({
  user,
  filterFunction,
  searchFunction,
}) => {
  const filteredAndSearchedExercises = user.exercises.filter((exercise) => {
    const matchesFilter = filterFunction ? filterFunction(exercise) : true;
    const matchesSearch = searchFunction ? searchFunction(exercise) : true;
    return matchesFilter && matchesSearch;
  });

  const router = useRouter();
  const [exerciseVideo, setExerciseVideo] = useState<URL>();
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [exercise, setExercise] = useState<Exercise>();

  const [targetPiece, setTargetPiece] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{
    message: React.ReactNode;
    type: string;
    show: boolean;
  }>({
    message: "",
    type: "",
    show: false,
  });

  const showToast = ({ message, type = "info" }: ShowToastParams) => {
    setToast({ message, type, show: true });
  };

  const handleDeletion = async () => {
    if (exercise) {
      await DeleteExercise(exercise);
      router.refresh();
      setToast({ ...toast, show: false });
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, show: false });
    setIsDeleting(false);
  };

  return (
    <div className="relative flex h-96 w-full flex-col gap-y-2">
      {filteredAndSearchedExercises.length > 0 ? (
        <>
          {filteredAndSearchedExercises
            .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name))
            .map((exercise: Exercise, i) => (
              <Piece
                className={`${isDeleting && exercise.name === targetPiece ? "opacity-30" : ""} flex w-full flex-shrink-0 flex-row items-center justify-between rounded-full border border-neutral-300 px-2 py-1 text-neutral-800 shadow-md shadow-neutral-300 transition-transform hover:scale-105 dark:border-neutral-700 dark:text-neutral-300 dark:shadow-neutral-950`}
                key={i}
              >
                <div className="flex w-full flex-row items-center justify-start gap-x-3">
                  <div className="hidden flex-row gap-x-1 md:flex md:flex-row">
                    {exercise.muscles &&
                      exercise.muscles.length > 0 &&
                      exercise.muscles.map((muscle, i) => (
                        <div
                          key={i}
                          className="flex-row items-center justify-center rounded-full bg-neutral-100 p-1 dark:bg-neutral-900"
                        >
                          <Image
                            draggable="false"
                            src={`/muscles/${muscle}.png`}
                            className="size-5"
                            quality={100}
                            width={80}
                            height={80}
                            alt={muscle}
                          />
                        </div>
                      ))}
                  </div>

                  <div className="flex w-full flex-row items-center gap-x-4">
                    <span className="max-w-24 truncate text-lg md:max-w-56 md:text-xl lg:max-w-56">
                      {exercise.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-x-1 md:gap-x-2.5">
                  <button
                    onClick={async () => {
                      if (exercise) {
                        await setExercise(exercise);
                        setTargetPiece(exercise.name);
                        setIsDeleting(true);
                        showToast({
                          message: (
                            <span>
                              Are you sure you want to delete{" "}
                              <span className="max-w-36 truncate text-violet-500">
                                {exercise.name}
                              </span>
                              ?
                            </span>
                          ),
                          type: "action",
                        });
                      }
                    }}
                  >
                    <Trash2Icon className="size-4 text-neutral-800 md:size-6 dark:text-neutral-200" />
                  </button>

                  <button
                    onClick={async () => {
                      const dialog = document.getElementById(
                        "exercise_update_modal",
                      ) as HTMLDialogElement;
                      if (exercise) {
                        await setExercise(exercise);
                      }
                      if (dialog) {
                        dialog.showModal();
                      }
                    }}
                  >
                    <SettingsIcon className="size-4 text-neutral-800 md:size-6 dark:text-neutral-200" />
                  </button>

                  <button
                    onClick={async () => {
                      const dialog = document.getElementById(
                        "exercise_description_modal",
                      ) as HTMLDialogElement;
                      if (exercise.description) {
                        await setExerciseDescription(exercise.description);
                      }
                      if (dialog) {
                        dialog.showModal();
                      }
                    }}
                    disabled={!exercise.description}
                  >
                    <BookOpenIcon className="size-4 text-neutral-800 md:size-6 dark:text-neutral-300" />
                  </button>

                  <button
                    onClick={async () => {
                      const dialog = document.getElementById(
                        "exercise_video_modal",
                      ) as HTMLDialogElement;
                      if (exercise.video) {
                        await setExerciseVideo(exercise.video);
                      }
                      if (dialog) {
                        dialog.showModal();
                      }
                    }}
                    disabled={!exercise.video}
                  >
                    <PlayIcon className="size-4 rounded-full bg-red-600 p-1 text-white md:size-6" />
                  </button>
                </div>
              </Piece>
            ))}
        </>
      ) : (
        <div className="h-96 w-full">
          <span className="flex h-full w-full items-center justify-center text-center text-3xl font-medium text-neutral-800 dark:text-neutral-300">
            You have no exercises in this category or with this name. To create
            one click on the plus sign at the top.
          </span>
        </div>
      )}
      <ExerciseVideoModal exerciseVideo={exerciseVideo} />
      <ExerciseUpdateModal exercise={exercise} />
      <ExerciseDescriptionModal exerciseDescription={exerciseDescription} />
      {toast.show && (
        <Toast
          message={toast.message}
          type={
            toast.type as "info" | "success" | "error" | "warning" | "action"
          }
          onClose={handleToastClose}
          onAction={handleDeletion}
          actionLabel="Delete"
        />
      )}
    </div>
  );
};
export default ExerciseTag;
function invariant(el: null) {
  throw new Error("Function not implemented.");
}
