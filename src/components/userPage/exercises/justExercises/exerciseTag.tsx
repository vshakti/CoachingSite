import {
  BookOpenIcon,
  ChevronsRightIcon,
  PlayIcon,
  SettingsIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import ExerciseVideoModal from "./exerciseVideoModal";
import { useState } from "react";
import ExerciseUpdateModal from "./exerciseUpdatingModal";
import ExerciseDescriptionModal from "./exerciseDescriptionModal";
import { DeleteExercise } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/toast";
import { useExerciseContext } from "@/lib/context/exerciseAdd";

interface ShowToastParams {
  message: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "action";
}

interface ExerciseTagProps {
  user: User;
  searchFunction?: (exercise: Exercise) => boolean;
  filterFunction?: (exercise: Exercise) => boolean;
  targetPiece: string;
  setTargetPiece: React.Dispatch<React.SetStateAction<string>>;
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
  targetPiece,
  setTargetPiece,
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

  const { exerciseList, setExerciseList, setTemplateDay, isAdding } =
    useExerciseContext();

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
      await DeleteExercise(exercise.$id!);
      router.refresh();
      setToast({ ...toast, show: false });
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, show: false });
    setIsDeleting(false);
  };

  return (
    <>
      {filteredAndSearchedExercises.length > 0 ? (
        <>
          {filteredAndSearchedExercises
            .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name))
            .map((exercise: Exercise, i) => (
              <Piece
                className={`${isDeleting && exercise.name === targetPiece ? "opacity-30" : ""} ${exerciseList.some((item) => item.name === exercise.name) ? "opacity-40" : ""} flex w-full flex-shrink-0 flex-row items-center justify-between bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 px-2 py-1`}
                key={i}
              >
                <div className="flex w-full flex-row items-center justify-start gap-x-3">
                  <div className="hidden flex-row gap-x-1 md:flex md:flex-row">
                    {exercise.muscles &&
                      exercise.muscles.length > 0 &&
                      exercise.muscles.map((muscle, i) => (
                        <div
                          key={i}
                          className="flex-row items-center justify-center"
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
                    <span
                      className={`${isAdding ? "max-w-64 md:w-5/6" : "max-w-24 md:max-w-56 lg:max-w-56"} truncate text-lg md:text-xl`}
                    >
                      {exercise.name}
                    </span>
                  </div>
                </div>

                <>
                  {isAdding ? (
                    <div className="flex flex-row">
                      <button
                        disabled={exerciseList.some(
                          (item) => item.name === exercise.name,
                        )}
                        onClick={async () => {
                          const isExerciseInList = exerciseList.some(
                            (item) => item.$id === exercise.$id,
                          );

                          if (!isExerciseInList) {
                            await setExerciseList((prevList) => [
                              ...prevList,
                              exercise,
                            ]);
                            const newExerciseSpecific = {
                              exercises: {
                                ...exercise,
                              },
                              targetRpe: "",
                              targetSets: "",
                              targetReps: "",
                              description: exercise.description || "",
                              id: { i }.toString(),
                            };

                            await setTemplateDay((prevDay) => ({
                              ...prevDay,
                              exerciseSpecifics: [
                                ...prevDay.exerciseSpecifics!,
                                newExerciseSpecific,
                              ],
                            }));
                          }
                        }}
                      >
                        <ChevronsRightIcon className="hover:text-cyan-500" />
                      </button>
                      {exerciseList.some(
                        (item) => item.name === exercise.name,
                      ) ? (
                        <>
                          {exerciseList.findIndex(
                            (item) => item.name === exercise.name,
                          ) + 1}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-x-2 md:gap-x-3">
                      <button
                        onClick={async () => {
                          if (exercise) {
                            await setExercise(exercise);
                            setTargetPiece(exercise.name);
                            setIsDeleting(true);
                            showToast({
                              message: (
                                <div className="flex h-16 items-center justify-center text-center">
                                  <span>
                                    Delete{" "}
                                    <span className="max-w-36 truncate text-cyan-500">
                                      {exercise.name}
                                    </span>{" "}
                                    ?
                                  </span>
                                </div>
                              ),
                              type: "action",
                            });
                          }
                        }}
                      >
                        <Trash2Icon className="size-4 text-white hover:text-cyan-500" />
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
                        <SettingsIcon className="size-4 text-white hover:text-cyan-500" />
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
                        <BookOpenIcon className="size-4 text-white hover:text-cyan-500" />
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
                        <PlayIcon className="size-4 rounded-full border bg-purple-950 p-0.5 text-white hover:bg-cyan-500 hover:text-slate-950 md:size-5" />
                      </button>
                    </div>
                  )}
                </>
              </Piece>
            ))}
        </>
      ) : (
        <div className="h-96 w-full">
          <span className="flex h-full w-full items-center justify-center text-center text-3xl font-medium text-white">
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
          actionLabel={<Trash2Icon className="size-4" />}
        />
      )}
    </>
  );
};
export default ExerciseTag;
