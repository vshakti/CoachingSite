"use client";
import { useTrackingExerciseContext } from "@/lib/context/exerciseTracking";
import { WeightIcon } from "lucide-react";
import OpenModalButton from "../openModalButton";
import dynamic from "next/dynamic";
const SelectorModal = dynamic(() => import("./selectorModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const AnimatedColoredChevrons = dynamic(() => import("./chevronsColorful"), {
  ssr: false,
});

interface ExerciseSelectorProps {
  user: User;
}

const ExerciseSelector = ({ user }: ExerciseSelectorProps) => {
  const { trackedExercise } = useTrackingExerciseContext();

  return (
    <div className="h-full w-full">
      {!trackedExercise.exerciseProgression.length ? (
        <div className="flex h-full items-center justify-center gap-3 p-6 text-5xl">
          <OpenModalButton
            className="bg-gradient-to-r from-violet-950/0 via-neutral-950 to-violet-950/0 px-16 py-2 text-3xl font-medium text-white hover:via-cyan-600 lg:text-5xl"
            modalId="select_tracked_modal"
          >
            Select an exercise
          </OpenModalButton>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center gap-2 p-3 text-slate-500">
          <div className="flex w-full items-center justify-between pl-8 md:pr-8">
            <div className="flex flex-col">
              <span className="truncate text-4xl text-white lg:text-5xl">
                {trackedExercise.exerciseName}
              </span>
              <div className="flex flex-row gap-1">
                <span>Performed</span>
                <span className="text-cyan-500">
                  {trackedExercise.exerciseProgression.length}
                </span>
                <span>total times</span>
              </div>
            </div>

            <OpenModalButton
              className="bg-gradient-to-r from-violet-950/0 via-neutral-950 to-violet-950/0 px-3 py-2 text-base font-medium text-white hover:via-cyan-700 md:text-xl lg:px-8"
              modalId="select_tracked_modal"
            >
              SWITCH
            </OpenModalButton>
          </div>
          <div className="flex w-full flex-row items-center justify-between bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-8">
            <div className="flex flex-col py-1">
              <div className="flex flex-col text-sm">
                <span className="">
                  {
                    trackedExercise.exerciseProgression[0].trainingDay.split(
                      " ",
                    )[0]
                  }
                </span>
                <div className="flex flex-row items-center gap-0.5">
                  <span className="text-cyan-500">
                    {trackedExercise.exerciseProgression[0].reps[0]}
                  </span>
                  reps
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl text-cyan-500 lg:text-5xl">
                  {trackedExercise.exerciseProgression[0].weight[0]}
                </span>
                <WeightIcon className="size-4 md:size-5" />
              </div>
            </div>

            <AnimatedColoredChevrons />

            <div className="flex flex-col py-1">
              <div className="flex flex-col text-sm">
                <span className="">
                  {
                    trackedExercise.exerciseProgression[
                      trackedExercise.exerciseProgression.length - 1
                    ].trainingDay.split(" ")[0]
                  }
                </span>
                <div className="flex flex-row items-center gap-0.5">
                  <span className="text-cyan-500">
                    {
                      trackedExercise.exerciseProgression[
                        trackedExercise.exerciseProgression.length - 1
                      ].reps[0]
                    }
                  </span>
                  reps
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl text-cyan-500 lg:text-5xl">
                  {
                    trackedExercise.exerciseProgression[
                      trackedExercise.exerciseProgression.length - 1
                    ].weight[0]
                  }
                </span>
                <WeightIcon className="size-4 md:size-5" />
              </div>
            </div>
          </div>

          <div></div>
        </div>
      )}
      <SelectorModal user={user} />
    </div>
  );
};
export default ExerciseSelector;
