import { PlusIcon } from "lucide-react";

import ExerciseSelection from "./exerciseSelection";
import OpenModalButton from "../openModalButton";
import ExerciseCreationModal from "./exerciseCreationModal";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const ExercisesMenu = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  return (
    <div className="flex max-h-[680px] w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-neutral-300 bg-neutral-50 p-2 font-medium text-neutral-800 shadow-md shadow-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-black">
      <div className="flex w-full flex-row items-center justify-between px-5">
        <h3 className="text-4xl md:text-5xl">
          {user.exercises.length} Exercises
        </h3>
        <OpenModalButton modalId="exercise_creation_modal" className="">
          <PlusIcon className="size-8 text-neutral-800 dark:text-neutral-300" />
        </OpenModalButton>
      </div>

      <ExerciseSelection user={user} />

      <ExerciseCreationModal />
    </div>
  );
};
export default ExercisesMenu;
