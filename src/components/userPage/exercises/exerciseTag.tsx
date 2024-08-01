import { BookOpenIcon, PlayIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import ExerciseVideoModal from "./exerciseVideoModal";
import { useState } from "react";
import ExerciseUpdateModal from "./exerciseUpdatingModal";
import ExerciseDescriptionModal from "./exerciseDescriptionModal";

interface ExerciseTagProps {
  user: User;
  filterFunction?: (exercise: Exercise) => boolean;
}

const ExerciseTag: React.FC<ExerciseTagProps> = ({ user, filterFunction }) => {
  const filteredExercises = filterFunction
    ? user.exercises.filter(filterFunction)
    : user.exercises;

  const [exerciseVideo, setExerciseVideo] = useState<URL>();
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [exercise, setExercise] = useState<Exercise>();

  return (
    <div className="flex w-full flex-col gap-y-2">
      {filteredExercises.length > 0 ? (
        <>
          {filteredExercises
            .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name))
            .map((exercise: Exercise, i) => (
              <div key={i} className="w-full antialiased">
                <div className="flex w-full cursor-grab flex-row items-center justify-between rounded-full border-neutral-400 bg-neutral-300 px-2 py-1 text-neutral-800 shadow-md shadow-neutral-950 transition-transform hover:scale-110 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  <div className="flex flex-row items-center justify-center gap-x-3">
                    <div className="items-center justify-center rounded-full bg-neutral-100 p-1 dark:bg-neutral-900">
                      <Image
                        src={`/muscles/${exercise.muscles}.png`}
                        className="size-7"
                        quality={100}
                        width={80}
                        height={80}
                        alt=""
                      />
                    </div>

                    <div className="flex flex-row items-center gap-x-4">
                      <span className="max-w-32 truncate text-xl lg:max-w-52">
                        {exercise.name}
                      </span>

                      <button
                        onClick={() => {
                          const dialog = document.getElementById(
                            "exercise_update_modal",
                          ) as HTMLDialogElement;
                          if (exercise) {
                            setExercise(exercise);
                          }
                          if (dialog) {
                            dialog.showModal();
                          }
                        }}
                      >
                        <SettingsIcon className="size-4 cursor-pointer text-neutral-800 dark:text-neutral-200" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-x-6">
                    <button
                      onClick={() => {
                        const dialog = document.getElementById(
                          "exercise_description_modal",
                        ) as HTMLDialogElement;
                        if (exercise.video) {
                          setExerciseDescription(exercise.description);
                        }
                        if (dialog) {
                          dialog.showModal();
                        }
                      }}
                      disabled={!exercise.description}
                    >
                      <BookOpenIcon className="size-7 text-neutral-800 dark:text-neutral-300" />
                    </button>

                    <button
                      onClick={() => {
                        const dialog = document.getElementById(
                          "exercise_video_modal",
                        ) as HTMLDialogElement;
                        if (exercise.video) {
                          setExerciseVideo(exercise.video);
                        }
                        if (dialog) {
                          dialog.showModal();
                        }
                      }}
                      disabled={!exercise.video}
                    >
                      <PlayIcon className="size-7 rounded-full bg-red-600 p-1 text-white" />
                    </button>
                  </div>
                </div>
              </div>
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
    </div>
  );
};
export default ExerciseTag;
