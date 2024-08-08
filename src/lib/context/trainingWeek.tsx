"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TrainingContextProps {
  trainingWeek: TrainingWeek | null;
  setTrainingWeek: (newWeek: TrainingWeek) => void;
}

const TrainingContext = createContext<TrainingContextProps | undefined>(
  undefined,
);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
  const [trainingWeek, setTrainingWeekState] = useState<TrainingWeek | null>(
    null,
  );

  const setTrainingWeek = (newWeek: TrainingWeek) => {
    setTrainingWeekState(newWeek);
  };

  return (
    <TrainingContext.Provider value={{ trainingWeek, setTrainingWeek }}>
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = (): TrainingContextProps => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error("useTraining must be used within a TrainingProvider");
  }
  return context;
};
