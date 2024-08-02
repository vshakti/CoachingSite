import ExercisesMenu from "./justExercises/exercisesMenu";

const Exercises = async () => {
  return (
    <div className="grid h-max w-full py-4 antialiased lg:ml-6 lg:grid-cols-4 lg:grid-rows-5">
      <div className="flex items-center justify-center px-4 lg:col-span-2 lg:row-span-2">
        <ExercisesMenu />
      </div>

      <div className="flex items-center justify-center border px-6 lg:col-span-2 lg:col-start-3 lg:row-span-2">
        DAY TEMPLATES
      </div>

      <div className="items-center justify-center border px-6 lg:col-span-4 lg:row-span-2">
        flexWEEKLY TEMPLATES
      </div>
    </div>
  );
};

export default Exercises;
