import { PlusIcon } from "lucide-react";

import ExerciseSelection from "./exerciseSelection";
import OpenModalButton from "@/components/userPage/openModalButton";
import ExerciseCreationModal from "./exerciseCreationModal";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const ExercisesMenu = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  return (
    <div className="flex max-h-[680px] w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-violet-600 bg-neutral-900 p-2 font-medium text-white shadow-md shadow-violet-500">
      <div className="flex w-full flex-row items-center justify-between px-5">
        <h3 className="text-4xl md:text-5xl">
          {user.exercises.length > 0 ? (
            <>
              {user.exercises.length >= 1 && user.exercises.length < 2 ? (
                <div>
                  <span className="text-violet-700">
                    {user.exercises.length}
                  </span>{" "}
                  Exercise
                </div>
              ) : (
                <div>
                  <span className="text-violet-700">
                    {user.exercises.length}
                  </span>{" "}
                  Exercises
                </div>
              )}
            </>
          ) : (
            <span>Exercises</span>
          )}
        </h3>
        <OpenModalButton modalId="exercise_creation_modal" className="">
          <PlusIcon className="size-8 text-white" />
        </OpenModalButton>
      </div>

      <ExerciseSelection user={user} />

      <ExerciseCreationModal />
    </div>
  );
};
export default ExercisesMenu;
