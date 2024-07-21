import React from "react";

type profileOptionsProps = {
  icon: React.ReactNode;
  text: string;
};

const profileOptions: React.FC<profileOptionsProps> = ({
  icon,
  text,
}: profileOptionsProps) => {
  return (
    <div className="group flex h-8 cursor-pointer items-center justify-start gap-x-1.5 rounded-md px-3 py-1 hover:bg-neutral-100 md:gap-x-5 lg:gap-x-6 2xl:gap-x-8 dark:text-neutral-300 dark:hover:bg-neutral-800">
      <div>{icon}</div>
      <span className="text-base font-medium group-hover:font-semibold lg:text-lg xl:text-xl 2xl:text-4xl">
        {text}
      </span>
    </div>
  );
};

export default profileOptions;
