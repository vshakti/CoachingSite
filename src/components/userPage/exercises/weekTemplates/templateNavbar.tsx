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
      <div className="fixed flex flex-col gap-2 overflow-hidden">
        <button
          onClick={() => {
            setTemplateType("All");
          }}
          className={`${templateType === "All" ? `` : ""} h-10 w-full truncate bg-gradient-to-r from-slate-950 via-slate-950/50 to-slate-950/0 px-2 py-1 text-lg text-white antialiased transition-transform hover:scale-110`}
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
              className={`${templateType === trainingDays.type ? `` : ""} h-10 w-full truncate border-white transition-transform hover:scale-110 ${getColorClassForType(trainingDays.type)} px-2 py-1 text-lg text-white antialiased`}
            >
              {trainingDays.type}
            </button>
          ))}
      </div>
    </div>
  );
};
export default TemplateNavbar;
