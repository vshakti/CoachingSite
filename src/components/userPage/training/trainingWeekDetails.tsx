"use client";

import { getTrainingDay } from "@/lib/actions/user.actions";
import { useTraining } from "@/lib/context/trainingWeek";
import {
  BedSingleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  CircleCheckBigIcon,
  LoaderCircleIcon,
  VideoOffIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getYouTubeEmbedUrl } from "@/constants";
import OpenModalButton from "../openModalButton";
import FinishExerciseModal from "./finishExerciseModal";

interface TrainingWeekDetailsProps {
  user: User;
  children: React.ReactNode;
  index: number;
}

const TrainingWeekDetails = ({
  children,
  index,
  user,
}: TrainingWeekDetailsProps) => {
  const [showDay, setShowDay] = useState(true);
  const { trainingWeek } = useTraining();
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const [trainingDaysArray, setTrainingDaysArray] = useState<TrainingDays[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingDays = async () => {
      setIsLoading(true);

      try {
        const savedTrainingDays = localStorage.getItem("trainingDaysArrayKey");
        const savedTrainingWeek = localStorage.getItem("trainingWeekKey");

        if (!trainingWeek && savedTrainingDays) {
          setTrainingDaysArray(JSON.parse(savedTrainingDays));
          setShowDay(true);
          return;
        }

        if (trainingWeek) {
          const storedTrainingWeek = savedTrainingWeek
            ? JSON.parse(savedTrainingWeek)
            : null;

          if (
            !storedTrainingWeek ||
            JSON.stringify(trainingWeek) !== JSON.stringify(storedTrainingWeek)
          ) {
            await fetchAndStoreTrainingDays(trainingWeek);
          } else {
            if (savedTrainingDays) {
              setTrainingDaysArray(JSON.parse(savedTrainingDays));
              setShowDay(true);
            }
          }
        }
      } catch (error) {
        console.error("Error in fetchTrainingDays:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAndStoreTrainingDays = async (week: any) => {
      if (!week.trainingDaySpecifics) return;

      const daysArray: (TrainingDays | null)[] = [];

      for (const daySpecific of week.trainingDaySpecifics) {
        if (!daySpecific.iD) {
          daysArray.push(null);
        } else {
          try {
            const trainingDay = await getTrainingDay(daySpecific.iD);
            daysArray.push(trainingDay || null);
          } catch (error) {
            console.error(
              `Error fetching training day with ID ${daySpecific.iD}:`,
              error,
            );
            daysArray.push(null);
          }
        }
      }

      localStorage.setItem("trainingDaysArrayKey", JSON.stringify(daysArray));
      localStorage.setItem("trainingWeekKey", JSON.stringify(week));
      setTrainingDaysArray(daysArray);
      setShowDay(true);
    };

    fetchTrainingDays();
  }, [trainingWeek]);

  return (
    <div className="flex w-full flex-col rounded-md bg-gradient-to-r from-zinc-950/0 via-violet-950/60 to-zinc-950/0">
      <div
        className={`${showDay ? "" : ""} relative flex w-full items-center justify-center p-1`}
      >
        <span className="py-2 text-4xl antialiased">{children}</span>
        <button
          onClick={() => {
            setShowDay(!showDay);
          }}
          className="absolute right-2"
        >
          {!showDay ? (
            <>
              <ChevronDownIcon />
            </>
          ) : (
            <>
              <ChevronUpIcon />
            </>
          )}
        </button>
      </div>
      <>
        {isLoading ? (
          <div className="flex w-full items-center justify-center py-2">
            <LoaderCircleIcon className="size-12 animate-spin" />
          </div>
        ) : (
          <div
            className={`${!showDay ? "hidden" : ""} h-full text-white antialiased`}
          >
            <div className="flex w-full flex-col gap-3 py-3">
              {trainingDaysArray && trainingDaysArray[index] != null ? (
                trainingDaysArray[index].exerciseSpecifics?.map(
                  (specifics, specificityIndex) => (
                    <>
                      {isExerciseOpen &&
                      exerciseName === specifics.exercises[0].name ? (
                        <div
                          key={specificityIndex}
                          className="flex flex-col gap-6 p-3 md:flex-row"
                        >
                          <div className="flex w-full flex-col gap-4 rounded-md md:w-1/2">
                            <div className="relative flex flex-row items-center justify-center gap-4 bg-gradient-to-r from-zinc-950/0 via-zinc-950/100 to-violet-950/0">
                              {specifics.exercises[0].muscles.length > 1 ? (
                                <div className="flex flex-row gap-2">
                                  {specifics.exercises[0].muscles.map(
                                    (muscles: string, m: number) => (
                                      <>
                                        <Image
                                          src={`/muscles/${muscles}.png`}
                                          width={60}
                                          height={60}
                                          quality={100}
                                          alt={specifics.exercises[0].muscles}
                                          className="size-10"
                                        />
                                      </>
                                    ),
                                  )}
                                </div>
                              ) : (
                                <>
                                  <Image
                                    src={`/muscles/${specifics.exercises[0].muscles}.png`}
                                    width={60}
                                    height={60}
                                    quality={100}
                                    alt={specifics.exercises[0].muscles}
                                    className="size-10"
                                  />
                                </>
                              )}
                              <span className="text-3xl">
                                {specifics.exercises[0].name}
                              </span>

                              <OpenModalButton
                                onClick={() => {
                                  console.log(specifics.exercises[0].$id);
                                }}
                                modalId="finish_exercise_modal"
                                className="absolute right-6"
                              >
                                <CircleCheckBigIcon className="size-8 text-cyan-500 transition-transform hover:scale-110" />
                              </OpenModalButton>

                              <button
                                onClick={() => {
                                  setIsExerciseOpen(false);
                                }}
                                className="absolute left-0"
                              >
                                <ChevronLeftIcon className="size-8 text-cyan-500 transition-transform hover:scale-110" />
                              </button>
                            </div>
                            <div className="flex w-full flex-row items-center justify-center gap-x-4 rounded-md bg-gradient-to-r from-zinc-950/0 via-zinc-950/100 to-violet-950/0 py-1 text-xl">
                              <div className="flex flex-row items-center justify-center gap-2">
                                <span className="text-zinc-600">Sets:</span>
                                {specifics.targetSets ? (
                                  <span className="text-cyan-500">
                                    {specifics.targetSets}
                                  </span>
                                ) : (
                                  <>0</>
                                )}
                              </div>

                              <div className="flex flex-row items-center justify-center gap-2">
                                <span className="text-zinc-600">Reps:</span>
                                {specifics.targetReps ? (
                                  <span className="text-cyan-500">
                                    {specifics.targetReps}
                                  </span>
                                ) : (
                                  <>0</>
                                )}
                              </div>

                              <div className="flex flex-row items-center justify-center gap-2">
                                <span className="text-zinc-600">RPE:</span>
                                {specifics.targetRpe ? (
                                  <span className="text-cyan-500">
                                    {specifics.targetRpe}
                                  </span>
                                ) : (
                                  <>0</>
                                )}
                              </div>
                            </div>

                            <div className="w-full bg-gradient-to-r from-zinc-950/0 via-zinc-950/100 to-violet-950/0 text-center">
                              <div className="flex flex-col gap-1 py-2">
                                <span className="w-full pb-2 tracking-wide">
                                  EXERCISE CUES{" "}
                                </span>
                                {specifics.exercises[0].description ? (
                                  <span className="remove-scrollbar h-32 overflow-auto overscroll-contain">
                                    {specifics.exercises[0].description}
                                  </span>
                                ) : (
                                  <div className="h-28">
                                    This exercise has no description.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${!specifics.exercises[0].video ? "h-max p-3 md:h-72" : "h-72"} flex w-full items-center justify-center rounded-md bg-gradient-to-r from-violet-950/0 via-zinc-950/100 to-violet-950/0 text-center md:w-1/2`}
                          >
                            {specifics.exercises[0].video ? (
                              <>
                                <iframe
                                  src={getYouTubeEmbedUrl(
                                    specifics.exercises[0].video,
                                  )}
                                  title="YouTube video player"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  className="h-full w-full rounded-md"
                                />
                              </>
                            ) : (
                              <div className="flex h-28 w-28 items-center justify-center rounded-full border md:h-44 md:w-44">
                                <VideoOffIcon className="size-16 md:size-28" />
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex w-full flex-col items-center justify-center">
                          <div className="flex w-2/3 items-center justify-center bg-gradient-to-r from-zinc-950/0 via-zinc-950/100 to-violet-950/0 px-4 py-2 text-3xl">
                            <button
                              onClick={() => {
                                setIsExerciseOpen(true);
                                setExerciseName(specifics.exercises[0].name);
                                setExerciseId(specifics.exercises[0].$id);
                              }}
                            >
                              {specifics.exercises[0].name}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ),
                )
              ) : (
                <div className="flex w-full flex-col items-center justify-center">
                  <div className="flex w-2/3 flex-col items-center justify-center gap-2 px-10 py-3">
                    <BedSingleIcon className="size-16" />
                    <span className="text-3xl">REST DAY</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
      <FinishExerciseModal
        exerciseId={exerciseId}
        exerciseName={exerciseName}
        user={user}
      />
    </div>
  );
};

export default TrainingWeekDetails;
