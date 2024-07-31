import ExercisesMenu from "./exercisesMenu";

const Exercises = async () => {
  return (
    <div className="grid h-max w-full py-4 antialiased md:ml-6 md:grid-cols-4 md:grid-rows-5 dark:bg-neutral-800">
      <div className="flex items-center justify-center px-4 md:col-span-2 md:row-span-2">
        <ExercisesMenu />
      </div>

      <div className="flex items-center justify-center border px-6 md:col-span-2 md:col-start-3 md:row-span-2">
        DAY TEMPLATES
      </div>

      <div className="items-center justify-center border px-6 md:col-span-4 md:row-span-2">
        flexWEEKLY TEMPLATES
      </div>
    </div>
  );
};

export default Exercises;
