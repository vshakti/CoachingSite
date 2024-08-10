"use client";

import {
  BedSingleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  RefreshCcwIcon,
  SquareAsteriskIcon,
} from "lucide-react";
import { useState } from "react";
import OpenModalButton from "../../openModalButton";
import { useTemplateType } from "@/lib/context/templateType";
import Image from "next/image";

interface TemplateDaysAddProps {
  children: React.ReactNode;
  dayLocation: number;
}

const TemplateDaysAdd = ({ children, dayLocation }: TemplateDaysAddProps) => {
  const [close, setClose] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const {
    setDayControler,
    dayControler,
    setWeeklyTraining,
    weeklyTraining,
    getColorClassForType,
    setCompleteCounter,
  } = useTemplateType();

  return (
    <div className="flex flex-col items-center justify-start gap-y-2 rounded-md border bg-gradient-to-tr from-slate-300 via-gray-400 to-slate-500">
      <div className="relative flex h-8 w-full items-center justify-center border-b border-slate-700 text-xl font-medium tracking-wide">
        {children}
        <button
          onClick={() => {
            setClose(!close);
          }}
          className="absolute right-0 lg:hidden"
        >
          {close ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </button>
      </div>
      <div
        className={`${close ? "hidden lg:flex" : ""} relative flex h-64 w-full items-center justify-center p-1`}
      >
        <div
          className={`${showSelect ? "" : "hidden"} absolute bottom-40 flex flex-row gap-x-5`}
        >
          {" "}
          <OpenModalButton
            onClick={() => setShowSelect(!showSelect)}
            modalId="templates_modal"
            className="transition-transform hover:scale-125"
          >
            <SquareAsteriskIcon className="size-10 rounded-full border bg-gradient-to-tl from-slate-950 to-violet-950 p-1 text-white" />
          </OpenModalButton>
          <button
            onClick={() => {
              setShowSelect(!showSelect);
              setWeeklyTraining((prevState) => {
                const newState = [...prevState];
                newState[dayControler] = {
                  trainingDays: null,
                  isRest: true,
                };
                return newState;
              });
              setCompleteCounter((prev) => prev + 1);
            }}
            className="transition-transform hover:scale-125"
          >
            <BedSingleIcon className="size-10 rounded-full border bg-gradient-to-tl from-slate-950 to-violet-950 p-1 text-white" />
          </button>
        </div>

        {weeklyTraining[dayLocation].trainingDays ? (
          <div
            className={`${getColorClassForType(weeklyTraining[dayLocation].trainingDays.type)} flex h-full w-full flex-col gap-2 rounded-md p-1 text-xs text-white shadow-sm shadow-slate-700`}
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="flex w-full items-center justify-center rounded-full bg-zinc-950 px-2">
                <span className="w-full truncate bg-gradient-to-r from-zinc-950/0 via-zinc-800/100 to-zinc-950/0 px-4">
                  {weeklyTraining[dayLocation].trainingDays?.name}
                </span>
              </span>
            </div>

            <div className="remove-scrollbar flex h-28 flex-col items-center justify-center gap-1 overflow-auto rounded-md bg-zinc-950 p-1 text-sm">
              {weeklyTraining[dayLocation].trainingDays?.exerciseSpecifics?.map(
                (specifics, i) => (
                  <div key={i}>
                    {specifics.exercises.map(
                      (exercises: Exercise, e: number) => (
                        <div
                          key={e}
                          className="flex flex-row gap-1 bg-gradient-to-r from-zinc-950/0 via-zinc-800/100 to-zinc-950/0 px-4"
                        >
                          <span className="w-16 truncate">
                            {exercises.name}
                          </span>
                          {exercises.muscles.map((muscle, m) => (
                            <div key={m}>
                              <Image
                                draggable="false"
                                src={`/muscles/${muscle}.png`}
                                className="size-5"
                                quality={100}
                                width={80}
                                height={80}
                                alt={muscle}
                              />
                            </div>
                          ))}
                        </div>
                      ),
                    )}
                  </div>
                ),
              )}
            </div>
            <div className="rounded-md bg-zinc-950">
              <div className="remove-scrollbar h-24 overflow-auto bg-gradient-to-r from-zinc-950/0 via-zinc-800/100 to-zinc-950/0 p-1 text-xs">
                {weeklyTraining[dayLocation].trainingDays?.description}
              </div>
            </div>
            <button
              className="absolute -right-0 -top-1"
              onClick={() => {
                setWeeklyTraining((prevState) => {
                  const newState = [...prevState];
                  newState[dayLocation] = {
                    trainingDays: null,
                    isRest: false,
                  };
                  return newState;
                });
                setCompleteCounter((prev) => prev - 1);
              }}
            >
              <RefreshCcwIcon className="size-6 rounded-full border bg-zinc-950 p-1 text-yellow-500" />
            </button>
          </div>
        ) : (
          <></>
        )}

        {weeklyTraining[dayLocation].isRest === true &&
        !weeklyTraining[dayLocation].trainingDays ? (
          <div className="relative flex h-full w-full items-center justify-center">
            <button
              className="absolute -top-1 right-0"
              onClick={() => {
                setWeeklyTraining((prevState) => {
                  const newState = [...prevState];
                  newState[dayLocation] = {
                    trainingDays: null,
                    isRest: false,
                  };
                  return newState;
                });
                setCompleteCounter((prev) => prev - 1);
              }}
            >
              <RefreshCcwIcon className="size-6 rounded-full border bg-zinc-950 p-1 text-yellow-500" />
            </button>
            <div className="flex flex-col items-center justify-center gap-2">
              <BedSingleIcon className="size-10" />
              <span className="text-black">REST DAY</span>
            </div>
          </div>
        ) : (
          <button
            className={`${weeklyTraining[dayLocation].trainingDays ? "hidden" : ""}`}
            onClick={() => {
              setShowSelect(!showSelect);
              setDayControler(dayLocation);
            }}
          >
            <PlusIcon className="size-12 text-black transition-transform hover:scale-110" />
          </button>
        )}
      </div>
    </div>
  );
};
export default TemplateDaysAdd;
