import DayTemplates from "./dayTemplates/dayTemplates";
import ExerciseSelection from "@/components/userPage/exercises/justExercises/exerciseSelection";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import WeeklyTemplates from "./weekTemplates/weeklyTemplates";
import dynamic from "next/dynamic";
const ExerciseCreationModal = dynamic(
  () =>
    import(
      "@/components/userPage/exercises/justExercises/exerciseCreationModal"
    ),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

const Exercises = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  return (
    <div className="grid h-max w-full gap-y-8 py-4 antialiased lg:ml-6 lg:grid-cols-4">
      <div className="flex flex-col items-center justify-start gap-x-6 gap-y-10 px-4 lg:col-span-4 lg:grid-cols-4 lg:flex-row lg:justify-center">
        <>
          <ExerciseSelection user={user} />

          <ExerciseCreationModal />
        </>
        <>
          <DayTemplates user={user} />
        </>
      </div>

      <div className="flex w-full items-center justify-center px-4 lg:col-span-4">
        <WeeklyTemplates user={user} />
      </div>
    </div>
  );
};

export default Exercises;
