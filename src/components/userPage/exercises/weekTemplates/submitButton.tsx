"use client";

import { CreateTrainingWeek } from "@/lib/actions/user.actions";
import { useTemplateType } from "@/lib/context/templateType";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserProps {
  user: User;
}

const SubmitWeekBtn = ({ user }: UserProps) => {
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

      const newTrainingWeek = await CreateTrainingWeek(weeklyTraining, userId!);

      setWeeklyTraining((prevState) =>
        prevState.map(() => ({
          trainingDays: null,
          isRest: false,
        })),
      );
      setCompleteCounter(0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={SubmitWeek}
      className={`${completeCounter < weeklyTraining.length ? "hidden" : ""} absolute right-0 rounded-full text-white`}
    >
      {!isLoading ? (
        <div className="rounded-md border border-slate-700 bg-gradient-to-br from-zinc-950 to-violet-950 px-3 py-2 text-sm hover:border-white hover:from-gray-900 hover:to-violet-900 md:text-base">
          CREATE
        </div>
      ) : (
        <div className="rounded-md border border-slate-700 bg-gradient-to-br from-zinc-950 to-violet-950 px-3 py-2 text-sm hover:border-white hover:from-gray-900 hover:to-violet-900 md:text-base">
          <LoaderIcon className="size-6 animate-spin" />
        </div>
      )}
    </button>
  );
};
export default SubmitWeekBtn;
