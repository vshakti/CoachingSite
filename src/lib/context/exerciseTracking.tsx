"use client";
import React, { createContext, useState, ReactNode } from "react";

declare interface ProgressionList {
  exerciseProgression: ExerciseProgression[];
  exerciseName: string;
  exerciseId: string;
}

interface ExerciseProgression {
  trainingDay: string;
  feedback: string;
  sets: number;
  reps: number[];
  rpe: number[];
  weight: number[];
}

interface ExerciseTrackingContextType {
  trackedExercise: ProgressionList;
  setTrackedExercise: React.Dispatch<React.SetStateAction<ProgressionList>>;
}

const TrackingExerciseContext = createContext<
  ExerciseTrackingContextType | undefined
>(undefined);

export const TrackingExerciseContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [trackedExercise, setTrackedExercise] = useState<ProgressionList>({
    exerciseProgression: [],
    exerciseName: "",
    exerciseId: "",
  });

  return (
    <TrackingExerciseContext.Provider
      value={{ trackedExercise, setTrackedExercise }}
    >
      {children}
    </TrackingExerciseContext.Provider>
  );
};

export const useTrackingExerciseContext = () => {
  const context = React.useContext(TrackingExerciseContext);
  if (context === undefined) {
    throw new Error(
      "useTrackingExerciseContext must be used within a TrackingExerciseContextProvider",
    );
  }
  return context;
};
