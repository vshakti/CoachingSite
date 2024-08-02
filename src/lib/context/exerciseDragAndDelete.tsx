import React, { createContext, useState, ReactNode, useContext } from "react";

interface LoandingAndDeleteType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  isGrabed: boolean;
  setGrabed: (loading: boolean) => void;
  isDeleted: boolean;
  setDeleted: (loading: boolean) => void;
}

const LoandingAndDelete = createContext<LoandingAndDeleteType | undefined>(
  undefined,
);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isGrabed, setGrabed] = useState(false);
  const [isDeleted, setDeleted] = useState(false);

  return (
    <LoandingAndDelete.Provider
      value={{
        isLoading,
        setLoading,
        isGrabed,
        setGrabed,
        isDeleted,
        setDeleted,
      }}
    >
      {children}
    </LoandingAndDelete.Provider>
  );
};

export const useLoading = (): LoandingAndDeleteType => {
  const context = useContext(LoandingAndDelete);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
