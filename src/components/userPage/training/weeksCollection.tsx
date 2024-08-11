"use client";

import { useTraining } from "@/lib/context/trainingWeek";
import Image from "next/image";

interface WeeksCollectionProps {
  user: User;
}

const WeeksCollection = ({ user }: WeeksCollectionProps) => {
  const { setTrainingWeek } = useTraining();

  return (
    <div className="remove-scrollbar grid h-[220px] grid-cols-3 gap-3 overflow-auto overscroll-contain md:grid-cols-5 lg:grid-cols-7">
      {user.trainingWeek && user.trainingWeek.length > 0 ? (
        <>
          {user.trainingWeek.map((week: any, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <div className="flex h-max w-32 flex-col items-center justify-center gap-2">
                <span className="flex w-full items-center justify-center text-center text-sm font-semibold tracking-wide text-cyan-400">
                  {week.name}
                </span>
              </div>
              <button
                onClick={() => {
                  setTrainingWeek(user.trainingWeek[i]);
                }}
                className="flex h-40 w-32 flex-col"
              >
                <div className="flex h-full w-full items-center justify-center rounded-md border border-cyan-400 bg-gradient-to-b from-zinc-950 to-black">
                  <Image
                    src="/logo/icon.png"
                    width={200}
                    height={200}
                    quality={100}
                    alt="nebula logo"
                    className="size-full opacity-85"
                  />
                </div>
                <div className="black h-1.5 w-full rounded-b-md border border-t-0 border-cyan-400"></div>
                <div className="black h-1.5 w-full rounded-b-md border border-t-0 border-cyan-400"></div>
                <div className="black h-1.5 w-full rounded-b-md border border-t-0 border-cyan-400"></div>
              </button>
            </div>
          ))}
        </>
      ) : (
        <span className="col-span-full w-full text-center text-3xl font-medium">
          You do not have any training templates yet. Go to the exercises
          section to create a week of training.
        </span>
      )}
    </div>
  );
};
export default WeeksCollection;
