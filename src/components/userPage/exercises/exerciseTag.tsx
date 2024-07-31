import { PlayIcon } from "lucide-react";
import Image from "next/image";

interface ExerciseTagProps {
  user: User;
  filterFunction?: (exercise: Exercise) => boolean;
}

const ExerciseTag: React.FC<ExerciseTagProps> = ({ user, filterFunction }) => {
  const filteredExercises = filterFunction
    ? user.exercises.filter(filterFunction)
    : user.exercises;

  return (
    <div className="flex w-full flex-col gap-y-2">
      {filteredExercises.length > 0 ? (
        <>
          {filteredExercises
            .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name))
            .map((exercise: Exercise, i) => (
              <div key={i} className="w-full antialiased">
                <div className="shadow-dark flex w-full flex-row items-center justify-between rounded-full border-neutral-400 bg-neutral-300 px-2 py-1 text-neutral-800 shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
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

                    <span className="text-xl">{exercise.name}</span>
                  </div>

                  <button disabled={!exercise.video}>
                    <PlayIcon className="size-7 rounded-full bg-red-600 p-1 text-white" />
                  </button>
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
    </div>
  );
};
export default ExerciseTag;
