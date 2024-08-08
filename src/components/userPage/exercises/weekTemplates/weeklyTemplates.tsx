"use client";

import { useState } from "react";
import SubmitWeekBtn from "./submitButton";
import TemplateDaysAdd from "./templateDaysAdd";
import TemplatesModal from "./templatesModal";
import { WeekDays } from "@/constants";

interface UserProps {
  user: User;
}

const WeeklyTemplates = ({ user }: UserProps) => {
  const [name, setName] = useState("");

  return (
    <div className="flex w-11/12 flex-col gap-y-4 rounded-md bg-gradient-to-br from-zinc-950 to-neutral-950 p-2 text-white antialiased">
      <div className="fonte-medium relative flex h-max w-full flex-row items-center justify-start gap-x-3 px-2 py-1 text-white md:justify-center">
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Training week name"
          className="h-10 bg-transparent bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 px-2 text-xl focus:ring-0"
        />
        <SubmitWeekBtn user={user} name={name} setName={setName} />
      </div>
      <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-7">
        {WeekDays.map((day, i) => (
          <div key={i} className="text-black transition-all hover:scale-105">
            <TemplateDaysAdd dayLocation={i}>{day}</TemplateDaysAdd>
          </div>
        ))}
      </div>
      <TemplatesModal user={user} />
    </div>
  );
};
export default WeeklyTemplates;
