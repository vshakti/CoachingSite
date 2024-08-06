"use client";

import { useTemplateType } from "@/lib/context/templateType";

interface UserProps {
  user: User;
}

const TemplateNavbar = ({ user }: UserProps) => {
  const { templateType, setTemplateType, getColorClassForType } =
    useTemplateType();

  const uniqueTrainingDays = Array.from(
    new Map(user.trainingDays.map((item) => [item.type, item])).values(),
  );

  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            setTemplateType("All");
          }}
          className={`${templateType === "All" ? `translate-x-1 scale-110` : ""} h-10 w-full truncate rounded-r-full border border-l-0 border-white bg-gradient-to-br from-gray-700 to-slate-950 px-2 py-1 text-lg text-white antialiased`}
        >
          All
        </button>
        {uniqueTrainingDays
          .sort((a, b) => a.type.localeCompare(b.type))
          .map((trainingDays, t) => (
            <button
              onClick={() => {
                setTemplateType(trainingDays.type);
              }}
              key={t}
              className={`${templateType === trainingDays.type ? `translate-x-1 scale-110` : ""} border-white ${getColorClassForType(trainingDays.type)} h-10 w-full truncate rounded-r-full border border-l-0 border-slate-700 px-2 py-1 text-lg text-white antialiased`}
            >
              {trainingDays.type}
            </button>
          ))}
      </div>
    </div>
  );
};
export default TemplateNavbar;
