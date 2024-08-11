"use client";
import { createContext, useState, useContext, ReactNode } from "react";

const cardColors = [
  "bg-gradient-to-r from-blue-950/75 via-blue-800/75 to-blue-600/0",
  "bg-gradient-to-r from-red-950/75 via-red-800/75 to-red-600/0",
  "bg-gradient-to-r from-green-950/75 via-green-800/75 to-green-600/0",
  "bg-gradient-to-r from-yellow-950/75 via-yellow-800/75 to-yellow-600/0",
  "bg-gradient-to-r from-purple-950/75 via-purple-800/75 to-purple-600/0",
  "bg-gradient-to-r from-indigo-950/75 via indigo-800/75 to-indigo-600/0",
  "bg-gradient-to-r from-pink-950/75 via-pink-800/75 to-pink-600/0",
  "bg-gradient-to-r from-gray-600/75 via-gray-300/75 to-gray-50/0",
  "bg-gradient-to-r from-gray-900/75 via-gray-800/75 to-gray-600/0",
];

const initialWeeklyTraining = Array(7).fill({
  trainingDays: null,
  isRest: false,
});

const getColorClassForType = (type: string): string => {
  const hash = Array.from(type).reduce((acc, char) => {
    const charCode = char.charCodeAt(0);
    return acc * 31 + charCode;
  }, 0);

  const index = Math.abs(hash) % cardColors.length;
  return cardColors[index];
};

interface TemplateTypeProps {
  templateType: string;
  setTemplateType: (type: string) => void;
  getColorClassForType: (type: string) => string;
  weeklyTraining: Array<{ trainingDays: TrainingDays | null; isRest: boolean }>;
  setWeeklyTraining: React.Dispatch<
    React.SetStateAction<
      Array<{ trainingDays: TrainingDays | null; isRest: boolean }>
    >
  >;
  dayControler: number;
  setDayControler: React.Dispatch<React.SetStateAction<number>>;
  completeCounter: number;
  setCompleteCounter: React.Dispatch<React.SetStateAction<number>>;
}

const TemplateTypeContext = createContext<TemplateTypeProps | undefined>(
  undefined,
);

export const TemplateTypeProvider = ({ children }: { children: ReactNode }) => {
  const [templateType, setTemplateType] = useState<string>("All");
  const [weeklyTraining, setWeeklyTraining] = useState(initialWeeklyTraining);
  const [dayControler, setDayControler] = useState(0);
  const [completeCounter, setCompleteCounter] = useState(0);

  return (
    <TemplateTypeContext.Provider
      value={{
        templateType,
        setTemplateType,
        getColorClassForType,
        weeklyTraining,
        setWeeklyTraining,
        dayControler,
        setDayControler,
        completeCounter,
        setCompleteCounter,
      }}
    >
      {children}
    </TemplateTypeContext.Provider>
  );
};

export const useTemplateType = () => {
  const context = useContext(TemplateTypeContext);
  if (!context) {
    throw new Error(
      "useTemplateType must be used within a TemplateTypeProvider",
    );
  }
  return context;
};
