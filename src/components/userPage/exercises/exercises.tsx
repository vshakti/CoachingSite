import DayTemplates from "./dayTemplates/dayTemplates";
import ExerciseSelection from "@/components/userPage/exercises/justExercises/exerciseSelection";

import ExerciseCreationModal from "@/components/userPage/exercises/justExercises/exerciseCreationModal";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Exercises = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  return (
    <div className="grid h-max w-full gap-y-8 py-4 antialiased lg:ml-6 lg:grid-cols-4 lg:grid-rows-5">
      <div className="flex flex-col items-center justify-start gap-x-6 gap-y-10 px-4 lg:col-span-4 lg:row-span-2 lg:grid-cols-4 lg:flex-row lg:justify-center">
        <>
          <ExerciseSelection user={user} />

          <ExerciseCreationModal />
        </>
        <>
          <DayTemplates user={user} />
        </>
      </div>

      <div className="w-full items-center justify-center border px-6 lg:col-span-4 lg:row-span-2 lg:row-start-3">
        flexWEEKLY TEMPLATES
      </div>
    </div>
  );
};

export default Exercises;
