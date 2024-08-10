"use client";
import { useTrackingExerciseContext } from "@/lib/context/exerciseTracking";
import { DumbbellIcon, XIcon } from "lucide-react";
import { useState } from "react";
import OpenModalButton from "../openModalButton";
import SelectorModal from "./selectorModal";

interface ExerciseSelectorProps {
  user: User;
}

const ExerciseSelector = ({ user }: ExerciseSelectorProps) => {
  const { trackedExercise, setTrackedExercise } = useTrackingExerciseContext();

  //GET THE AVERAGE WEIGHT
  const allWeights = trackedExercise.exerciseProgression.flatMap(
    (entry) => entry.weight,
  );
  const totalWeight = allWeights.reduce((sum, weight) => sum + weight, 0);
  const averageWeight = totalWeight / allWeights.length;

  //GET THE AVERAGE REPS
  const allReps = trackedExercise.exerciseProgression.flatMap(
    (entry) => entry.reps,
  );
  const totalReps = allReps.reduce((sum, reps) => sum + reps, 0);
  const averageReps = totalReps / allReps.length;

  //GET THE AVERAGE RPE
  const allRPE = trackedExercise.exerciseProgression.flatMap(
    (entry) => entry.rpe,
  );
  const totalRPE = allRPE.reduce((sum, rpe) => sum + rpe, 0);
  const averageRPE = totalRPE / allRPE.length;

  //.toFixed(1);

  return (
    <div className="relative h-full w-full">
      {!trackedExercise.exerciseProgression.length ? (
        <div className="flex h-full flex-row items-center justify-center gap-3 text-5xl">
          Start tracking...
          <OpenModalButton modalId="select_tracked_modal">
            <DumbbellIcon className="size-8" />
          </OpenModalButton>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col p-3">
          <div className="flex w-full items-center justify-between px-8">
            <div className="flex flex-col">
              <span className="truncate text-2xl md:text-4xl">
                {trackedExercise.exerciseName}
              </span>
              <div className="flex flex-row gap-1 text-slate-500">
                <span>Done</span>
                <span className="text-yellow-400">
                  {trackedExercise.exerciseProgression.length}
                </span>
                <span>total times</span>
              </div>
            </div>

            <OpenModalButton className="" modalId="select_tracked_modal">
              <DumbbellIcon className="size-8" />
            </OpenModalButton>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col p-3">
              <div className="flex flex-row gap-6 text-sm text-slate-500">
                <span>First time</span>
                <span className="text-yellow-400">
                  {
                    trackedExercise.exerciseProgression[0].trainingDay.split(
                      " ",
                    )[0]
                  }
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-sm text-slate-500">Kg</span>
                <span className="text-6xl text-yellow-400">
                  {trackedExercise.exerciseProgression[0].weight[0]}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-3">
              <div className="flex flex-row gap-6 text-sm text-slate-500">
                <span>Last time</span>
                <span className="text-yellow-400">
                  {
                    trackedExercise.exerciseProgression[
                      trackedExercise.exerciseProgression.length - 1
                    ].trainingDay.split(" ")[0]
                  }
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-sm text-slate-500">Kg</span>
                <span className="text-6xl text-yellow-400">
                  {
                    trackedExercise.exerciseProgression[
                      trackedExercise.exerciseProgression.length - 1
                    ].weight[0]
                  }
                </span>
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
