"use client";

import { DeleteTrainingDay } from "@/lib/actions/user.actions";
import { useTemplateType } from "@/lib/context/templateType";
import { LoaderIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserProps {
  user: User;
}

const TemplateCards = ({ user }: UserProps) => {
  const {
    templateType,
    getColorClassForType,
    setWeeklyTraining,
    dayControler,
    setCompleteCounter,
  } = useTemplateType();

  const [isLoading, setIsLoading] = useState(false);
  const [dayId, setDayId] = useState("");
  const router = useRouter();

  return (
    <>
      {templateType === "All" ? (
        <>
          {user.trainingDays.map((trainingDays, t) => (
            <div
              key={t}
              className="relative w-max text-xs transition-transform hover:scale-110"
            >
              <button
                onClick={() => {
                  setWeeklyTraining((prevState) => {
                    const newState = [...prevState];
                    newState[dayControler] = {
                      trainingDays: trainingDays,
                      isRest: false,
                    };
                    return newState;
                  });
                  const dialog = document.getElementById(
                    "templates_modal",
                  ) as HTMLDialogElement;
                  if (dialog) {
                    dialog.close();
                  }
                  setCompleteCounter((prev) => prev + 1);
                }}
                className={`${getColorClassForType(trainingDays.type)} ${dayId === trainingDays.$id ? "opacity-30" : ""} flex w-52 flex-col items-center gap-2 rounded-md p-2 text-white shadow-md shadow-slate-800`}
              >
                <h1 className="flex w-full items-center justify-center rounded-full bg-slate-950 px-2 py-0.5">
                  <span className="w-full truncate bg-gradient-to-r from-zinc-950/0 via-zinc-800/100 to-zinc-950/0 px-5">
                    {trainingDays.name}
                  </span>
                </h1>
                <div className="remove-scrollbar flex h-40 w-full flex-col gap-y-2 overflow-auto rounded-md bg-slate-950 p-2 text-xs">
                  {trainingDays.exerciseSpecifics?.map((specifics, s) => (
                    <div
                      key={s}
                      className="flex w-full flex-row items-center justify-evenly gap-x-2 bg-gradient-to-r from-zinc-950/0 via-zinc-800/100 to-zinc-950/0 p-1"
                    >
                      {specifics.exercises.map(
                        (exercise: Exercise, e: number) => (
                          <>
                            <div
                              key={e}
                              className="flex flex-col items-center justify-center gap-1"
                            >
                              <span className="w-14 truncate">
                                {exercise.name}
                              </span>
                              <div className="flex flex-row gap-1">
                                {exercise.muscles.map((muscle, m) => (
                                  <div key={m}>
                                    <Image
                                      draggable="false"
                                      src={`/muscles/${muscle}.png`}
                                      className="size-4"
                                      quality={100}
                                      width={80}
                                      height={80}
                                      alt={muscle}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <>
                                {specifics.targetSets ? (
                                  <div className="flex flex-row gap-x-1">
                                    <span className="text-slate-600">
                                      Sets:
                                    </span>
                                    <span>{specifics.targetSets}</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-row gap-x-1">
                                    <span className="text-slate-600">
                                      Sets:
                                    </span>
                                    <span>0</span>
                                  </div>
                                )}
                              </>
                              <>
                                {specifics.targetReps ? (
                                  <div className="flex flex-row gap-x-1">
                                    <span className="text-slate-600">
                                      Reps:
                                    </span>
                                    <span>{specifics.targetReps}</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-row gap-x-1">
                                    <span className="text-slate-600">
                                      Reps:
                                    </span>
                                    <span>0</span>
                                  </div>
                                )}
                              </>
                              <>
                                {specifics.targetRpe ? (
                                  <div className="flex flex-row gap-x-1">
                                    <span className="text-slate-600">RPE:</span>
                                    <span>{specifics.targetRpe}</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-row gap-x-1">
                                    <span className="text-slate-600">RPE:</span>
                                    <span>0</span>
                                  </div>
                                )}
                              </>
                            </div>
                          </>
                        ),
                      )}
                    </div>
                  ))}
                </div>
              </button>
              <button
                onClick={async () => {
                  setDayId(trainingDays.$id!);
                  setIsLoading(true);
                  await DeleteTrainingDay(trainingDays.$id!);
                  router.refresh();
                  setIsLoading(false);
                }}
                className="absolute -right-1 top-1 rounded-full border bg-slate-950 p-1 text-white transition-transform hover:scale-110"
              >
                {isLoading && dayId === trainingDays.$id ? (
                  <LoaderIcon className="size-4 animate-spin" />
                ) : (
                  <TrashIcon className="size-4" />
                )}
              </button>
            </div>
          ))}
        </>
      ) : (
        <>
          {user.trainingDays
            .filter((trainingDay) => trainingDay.type === templateType)
            .map((trainingDay, td) => (
              <div
                key={td}
                className="relative w-max text-xs transition-transform hover:scale-110"
              >
                <button
                  onClick={() => {
                    setWeeklyTraining((prevState) => {
                      const newState = [...prevState];
                      newState[dayControler] = {
                        trainingDays: trainingDay,
                        isRest: false,
                      };
                      return newState;
                    });
                    const dialog = document.getElementById(
                      "templates_modal",
                    ) as HTMLDialogElement;
                    if (dialog) {
                      dialog.close();
                    }
                  }}
                  key={td}
                  className={`${getColorClassForType(trainingDay.type)} ${dayId === trainingDay.$id ? "opacity-30" : ""} flex w-52 flex-col items-center gap-2 rounded-md border border-slate-700 p-2 text-white shadow-md shadow-slate-800`}
                >
                  <h1 className="flex w-full items-center justify-center rounded-full bg-slate-950 px-2 py-0.5">
                    <span className="w-full truncate bg-gradient-to-r from-zinc-950/0 via-zinc-800/100 to-zinc-950/0 px-5">
                      {trainingDay.name}
                    </span>
                  </h1>
                  <div className="remove-scrollbar flex h-40 w-full flex-col gap-y-2 overflow-auto rounded-md bg-slate-950 p-2 text-xs">
                    {trainingDay.exerciseSpecifics?.map((specifics, sp) => (
                      <div
                        key={sp}
                        className="flex w-full flex-row items-center justify-evenly gap-x-2 bg-gradient-to-r from-zinc-950/0 via-zinc-800/100 to-zinc-950/0 p-1"
                      >
                        {specifics.exercises.map(
                          (exercise: Exercise, exId: number) => (
                            <div key={exId} className="flex flex-col gap-1">
                              <span className="w-14 truncate">
                                {exercise.name}
                              </span>
                              <div className="flex flex-row gap-1">
                                {exercise.muscles.map((muscle, m) => (
                                  <div key={m} className="">
                                    <Image
                                      draggable="false"
                                      src={`/muscles/${muscle}.png`}
                                      className="size-4"
                                      quality={100}
                                      width={80}
                                      height={80}
                                      alt={muscle}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ),
                        )}
                        <div>
                          {specifics.targetSets ? (
                            <div className="flex flex-row gap-x-1">
                              <span className="text-slate-600">Sets:</span>
                              <span>{specifics.targetSets}</span>
                            </div>
                          ) : (
                            <div className="flex flex-row gap-x-1">
                              <span className="text-slate-600">Sets:</span>
                              <span>0</span>
                            </div>
                          )}
                          {specifics.targetReps ? (
                            <div className="flex flex-row gap-x-1">
                              <span className="text-slate-600">Reps:</span>
                              <span>{specifics.targetReps}</span>
                            </div>
                          ) : (
                            <div className="flex flex-row gap-x-1">
                              <span className="text-slate-600">Reps:</span>
                              <span>0</span>
                            </div>
                          )}
                          {specifics.targetRpe ? (
                            <div className="flex flex-row gap-x-1">
                              <span className="text-slate-600">RPE:</span>
                              <span>{specifics.targetRpe}</span>
                            </div>
                          ) : (
                            <div className="flex flex-row gap-x-1">
                              <span className="text-slate-600">RPE:</span>
                              <span>0</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </button>
                <button
                  onClick={async () => {
                    setDayId(trainingDay.$id!);
                    setIsLoading(true);
                    await DeleteTrainingDay(trainingDay.$id!);
                    router.refresh();
                    setIsLoading(false);
                  }}
                  className="absolute -right-1 top-1 rounded-full border bg-slate-950 p-1 text-white transition-transform hover:scale-110"
                >
                  {isLoading && dayId === trainingDay.$id ? (
                    <LoaderIcon className="size-4 animate-spin" />
                  ) : (
                    <TrashIcon className="size-4" />
                  )}
                </button>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default TemplateCards;
