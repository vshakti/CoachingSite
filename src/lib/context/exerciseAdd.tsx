"use client";
import React, { createContext, useState, ReactNode } from "react";

interface ExerciseAdd {
  isAdding: boolean;
  setIsAdding: (loading: boolean) => void;
  exerciseList: Exercise[];
  setExerciseList: React.Dispatch<React.SetStateAction<Exercise[]>>;
  templateDay: TrainingDays;
  setTemplateDay: React.Dispatch<React.SetStateAction<TrainingDays>>;
}

const ExerciseContext = createContext<ExerciseAdd | undefined>(undefined);

export const ExerciseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [templateDay, setTemplateDay] = useState<TrainingDays>({
    exerciseSpecifics: [],
    name: "",
    description: "",
    type: "",
  });

  return (
    <ExerciseContext.Provider
      value={{
        isAdding,
        setIsAdding,
        exerciseList,
        setExerciseList,
        templateDay,
        setTemplateDay,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExerciseContext = () => {
  const context = React.useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error(
      "useExerciseContext must be used within an ExerciseProvider",
    );
  }
  return context;
};
