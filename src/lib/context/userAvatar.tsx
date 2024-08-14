"use client";

import React, { useState, createContext, useContext, FC } from "react";

interface UserAvatarContextType {
  userAvatar: string | null;
  setUserAvatar: (avatar: string | null) => void;
}

const UserAvatarContext = createContext<UserAvatarContextType | null>(null);

export const UserAvatarProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  return (
    <UserAvatarContext.Provider value={{ userAvatar, setUserAvatar }}>
      {children}
    </UserAvatarContext.Provider>
  );
};

export const useUserAvatar = (): UserAvatarContextType => {
  const context = useContext(UserAvatarContext);
  if (context === null) {
    throw new Error("useUserAvatar must be used within a UserAvatarProvider");
  }
  return context;
};
