"use client";
import { useTrackingExerciseContext } from "@/lib/context/exerciseTracking";
import { WeightIcon } from "lucide-react";

interface AverageAndFeedbackProps {
  children: React.ReactNode;
}

const AverageAndFeedback = ({ children }: AverageAndFeedbackProps) => {
  const { trackedExercise } = useTrackingExerciseContext();

  const allWeights = trackedExercise.exerciseProgression.flatMap(
    (entry) => entry.weight,
  );
  const totalWeight = allWeights.reduce((sum, weight) => sum + weight, 0);
  const averageWeight = totalWeight / allWeights.length;

  const allSets = trackedExercise.exerciseProgression.flatMap(
    (entry) => entry.sets,
  );
  const totalSets = allSets.reduce((sum, sets) => sum + sets, 0);
  const averageSets = totalSets / allSets.length;

  const allReps = trackedExercise.exerciseProgression.flatMap(
    (entry) => entry.reps,
  );
  const totalReps = allReps.reduce((sum, reps) => sum + reps, 0);
  const averageReps = totalReps / allReps.length;

  const allRPE = trackedExercise.exerciseProgression.flatMap(
    (entry) => entry.rpe,
  );
  const totalRPE = allRPE.reduce((sum, rpe) => sum + rpe, 0);
  const averageRPE = totalRPE / allRPE.length;

  return (
    <>
      {!trackedExercise.exerciseProgression.length ? (
        <>{children}</>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-evenly text-slate-500">
          <div className="flex w-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-3">
            <span className="flex flex-row items-center gap-1 text-xl">
              Average <WeightIcon className="size-5" />
            </span>
            <div className="rounded-full bg-gradient-to-br from-cyan-500 to-indigo-700 p-1">
              <div className="flex size-16 flex-col items-center justify-center rounded-full bg-neutral-950 text-white">
                <span className="text-xl">{averageWeight.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-3">
            <span className="flex flex-row items-center gap-1 text-xl text-slate-600">
              Average sets
            </span>
            <div className="rounded-full bg-gradient-to-br from-cyan-500 to-indigo-700 p-1">
              <div className="flex size-16 flex-col items-center justify-center rounded-full bg-neutral-950 text-white">
                <span className="text-xl">{averageSets.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-3">
            <span className="flex flex-row items-center gap-1 text-xl">
              Average reps
            </span>
            <div className="rounded-full bg-gradient-to-br from-cyan-500 to-indigo-700 p-1">
              <div className="flex size-16 flex-col items-center justify-center rounded-full bg-neutral-950 text-white">
                <span className="text-xl">{averageReps.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-3">
            <span className="flex flex-row items-center gap-1 text-xl">
              Average RPE
            </span>
            <div className="rounded-full bg-gradient-to-br from-cyan-500 to-indigo-700 p-1">
              <div className="flex size-16 flex-col items-center justify-center rounded-full bg-neutral-950 text-white">
                <span className="text-xl">{averageRPE.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AverageAndFeedback;
