"use client";

import { useState } from "react";
import TemplateDaysAdd from "./templateDaysAdd";
import { WeekDays } from "@/constants";
import dynamic from "next/dynamic";
import { useLoggedUser } from "@/lib/context/loggedUser";
const TemplatesModal = dynamic(() => import("./templatesModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const SubmitWeekBtn = dynamic(() => import("./submitButton"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const WeeklyTemplates = () => {
  const [name, setName] = useState("");
  const { loggedUser } = useLoggedUser();

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
        <SubmitWeekBtn user={loggedUser!} name={name} setName={setName} />
      </div>
      <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-7">
        {WeekDays.map((day, i) => (
          <div key={i} className="text-black transition-all hover:scale-105">
            <TemplateDaysAdd dayLocation={i}>{day}</TemplateDaysAdd>
          </div>
        ))}
      </div>
      <TemplatesModal user={loggedUser!} />
    </div>
  );
};
export default WeeklyTemplates;
