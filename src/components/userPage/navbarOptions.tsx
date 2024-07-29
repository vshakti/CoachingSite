import React from "react";

type navbarOptionsProps = {
  icon: React.ReactNode;
  text: string;
};

const navbarOptions: React.FC<navbarOptionsProps> = ({
  icon,
  text,
}: navbarOptionsProps) => {
  return (
    <div className="group flex h-8 cursor-pointer flex-col items-center justify-start gap-x-1.5 rounded-md px-3 py-1 hover:bg-neutral-100 md:flex-row md:gap-x-5 lg:gap-x-6 2xl:gap-x-8 dark:text-neutral-300 dark:hover:bg-neutral-800">
      <div>{icon}</div>
      <span className="hidden text-base font-medium group-hover:font-semibold md:block md:text-3xl">
        {text}
      </span>
    </div>
  );
};

export default navbarOptions;
