import SubmitWeekBtn from "./submitButton";
import TemplateDaysAdd from "./templateDaysAdd";
import TemplatesModal from "./templatesModal";
import { WeekDays } from "@/constants";

interface UserProps {
  user: User;
}

const WeeklyTemplates = ({ user }: UserProps) => {
  return (
    <div className="flex w-11/12 flex-col gap-y-4 rounded-md bg-gradient-to-br from-zinc-950 to-neutral-950 p-2 text-white antialiased">
      <div className="fonte-medium relative flex h-max w-full flex-row items-center justify-center gap-x-3 px-2 py-1 text-white">
        <h3 className="text-3xl tracking-wide">TRAINING WEEK</h3>
        <SubmitWeekBtn user={user} />
      </div>
      <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-7">
        {WeekDays.map((day, i) => (
          <div key={i} className="text-black transition-all hover:scale-105">
            <TemplateDaysAdd dayLocation={i}>{day}</TemplateDaysAdd>
          </div>
        ))}
      </div>
      <TemplatesModal />
    </div>
  );
};
export default WeeklyTemplates;
