"use client";

import { CreateTrainingWeek } from "@/lib/actions/user.actions";
import { useTemplateType } from "@/lib/context/templateType";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SubmitWeekBtn {
  user: User;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const SubmitWeekBtn = ({ user, name, setName }: SubmitWeekBtn) => {
  const {
    weeklyTraining,
    completeCounter,
    setWeeklyTraining,
    setCompleteCounter,
  } = useTemplateType();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function SubmitWeek() {
    try {
      setIsLoading(true);
      const userId = user.$id;

      const newTrainingWeek = await CreateTrainingWeek(
        weeklyTraining,
        name,
        userId!,
      );

      setWeeklyTraining((prevState) =>
        prevState.map(() => ({
          trainingDays: null,
          isRest: false,
        })),
      );
      setCompleteCounter(0);
      setName("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={SubmitWeek}
      className={`${completeCounter < weeklyTraining.length ? "" : ""} ${name === "" ? "hidden" : ""} absolute right-0 rounded-full text-white`}
    >
      {!isLoading ? (
        <div className="bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 px-6 py-2 text-sm transition-transform hover:scale-110 md:text-base">
          CREATE
        </div>
      ) : (
        <div className="bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 px-6 py-2 text-sm transition-transform hover:scale-110 md:text-base">
          <LoaderIcon className="size-6 animate-spin" />
        </div>
      )}
    </button>
  );
};
export default SubmitWeekBtn;
