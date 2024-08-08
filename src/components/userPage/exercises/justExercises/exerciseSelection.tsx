"use client";

import { useState } from "react";
import Image from "next/image";
import { DumbbellIcon, ListIcon, PlusIcon, SearchIcon } from "lucide-react";
import ExerciseTag from "./exerciseTag";
import OpenModalButton from "../../openModalButton";

interface UserProps {
  user: User;
}

const ExerciseSelection: React.FC<UserProps> = ({ user }) => {
  const [select, setSelect] = useState<string>("Search");
  const muscleSelect = select as Muscles;
  const [targetPiece, setTargetPiece] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const selection = [
    "Cardio",
    "Biceps",
    "Calves",
    "Chest",
    "Core",
    "Erectors",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Latissimus",
    "Quadriceps",
    "Shoulders",
    "Trapezius",
    "Triceps",
  ];
  const [exerciseOpen, setExerciseOpen] = useState(true);

  return (
    <>
      <div
        className={`${!exerciseOpen ? "" : "hidden"} flex flex-col items-center justify-center gap-y-2`}
      >
        <button
          onClick={() => {
            setExerciseOpen(!exerciseOpen);
          }}
        >
          <DumbbellIcon className="size-12 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-2 text-white" />
        </button>
        <h1 className="bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 px-8 text-lg font-medium tracking-wide text-white antialiased">
          CREATE YOUR EXERCISES
        </h1>
      </div>

      <div
        className={`${exerciseOpen ? "flex h-max w-full flex-row px-1" : "hidden"} max-h-[640px] max-w-[440px] transition-transform duration-500 md:max-w-[580px]`}
      >
        <ul className="flex flex-col items-end justify-center">
          <button
            onClick={() => {
              setSelect("Search");
            }}
            className={`${select === "Search" ? "h-14 border-b bg-gray-950" : "h-9 border-r bg-zinc-950"} rounded-l-lg border-l border-t border-white px-2 text-white transition-colors`}
          >
            <ListIcon
              className={`${select === "Search" ? "size-10 md:size-11" : "size-5 md:size-7"} text-white`}
            />
          </button>
          {selection.map((exercise, index) => (
            <button
              key={index}
              onClick={() => {
                setSelect(exercise);
              }}
              className={`${select === exercise ? "h-14 border-b border-t bg-gray-950" : "h-9 border-r bg-zinc-950"} ${exercise === "Triceps" ? "border-b" : ""} rounded-l-lg border-l border-white px-2 text-white transition-colors`}
            >
              <Image
                src={`/muscles/${exercise}.png`}
                width={200}
                height={200}
                quality={100}
                alt=""
                className={`${select === exercise ? "size-11 md:size-12" : "size-5 md:size-7"}`}
              />
            </button>
          ))}
        </ul>
        <div className="flex w-full items-start justify-start rounded-r-lg border border-l-0 border-white bg-gradient-to-r from-gray-950 via-zinc-950 to-gray-950 px-2 text-white">
          {select === "Search" ? (
            <div className="flex h-full w-full flex-col items-center justify-start gap-y-4 px-4 pt-2">
              <div className="flex w-full flex-col items-center justify-center gap-y-2">
                <div className="relative flex w-full flex-row items-center justify-center bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0">
                  {user.exercises.length > 0 ? (
                    <span className="absolute left-10 p-1 text-2xl font-medium text-white md:text-2xl xl:text-4xl">
                      {user.exercises.length}
                    </span>
                  ) : (
                    <></>
                  )}

                  <h3 className="text-4xl font-medium text-white md:text-5xl xl:text-6xl">
                    All
                  </h3>
                  <div className="absolute left-0">
                    <OpenModalButton
                      onClick={setTargetPiece}
                      modalId="exercise_creation_modal"
                      className=""
                    >
                      <PlusIcon className="size-8 text-yellow-400 md:size-10" />
                    </OpenModalButton>
                  </div>
                  <button
                    className="absolute right-0"
                    onClick={() => {
                      setExerciseOpen(!exerciseOpen);
                    }}
                  >
                    <DumbbellIcon className="size-8 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-1 text-white md:size-8 lg:size-10" />
                  </button>
                </div>

                <div className="flex h-6 w-full items-center">
                  <div className="relative flex w-full flex-row">
                    <input
                      className="w-full rounded-l-full border border-violet-800 pl-2 pr-10 text-gray-600 outline-none"
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    ></input>
                    <SearchIcon className="pointer-events-none absolute -bottom-3 -right-2 size-11 rounded-full bg-zinc-950" />
                  </div>
                </div>
              </div>

              <div className="remove-scrollbar overflow-x-show flex h-[440px] w-full flex-col items-start justify-start gap-y-1.5 overflow-y-auto overscroll-contain rounded-3xl p-1">
                <ExerciseTag
                  targetPiece={targetPiece}
                  setTargetPiece={setTargetPiece}
                  user={user}
                  searchFunction={(exercise) =>
                    exercise.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-start gap-y-4 px-4 pt-2">
              <div className="flex w-full flex-col items-center justify-center gap-y-2">
                <div className="relative flex w-full flex-row items-center justify-center bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0">
                  <h3 className="text-4xl font-medium text-white md:text-5xl xl:text-6xl">
                    {select}
                  </h3>
                  <div className="absolute left-0">
                    <OpenModalButton
                      onClick={setTargetPiece}
                      modalId="exercise_creation_modal"
                      className=""
                    >
                      <PlusIcon className="size-8 text-yellow-500 md:size-10" />
                    </OpenModalButton>
                  </div>
                  <button
                    className="absolute right-0"
                    onClick={() => {
                      setExerciseOpen(!exerciseOpen);
                    }}
                  >
                    <DumbbellIcon className="size-8 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-1 text-white md:size-8 lg:size-10" />
                  </button>
                </div>
                <div className="flex h-6 w-full items-center">
                  <div className="relative flex w-full flex-row">
                    <input
                      className="w-full rounded-l-full border border-violet-800 pl-2 pr-10 text-gray-600 outline-none"
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    ></input>
                    <SearchIcon className="pointer-events-none absolute -bottom-3 -right-2 size-11 rounded-full bg-zinc-950" />
                  </div>
                </div>
              </div>

              <div className="remove-scrollbar overflow-x-show flex h-[440px] w-full flex-col items-start justify-start gap-y-1.5 overflow-y-auto overscroll-contain rounded-3xl p-1">
                <ExerciseTag
                  targetPiece={targetPiece}
                  setTargetPiece={setTargetPiece}
                  filterFunction={(exercise: Exercise) =>
                    exercise.muscles.includes(muscleSelect)
                  }
                  searchFunction={(exercise) =>
                    exercise.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  }
                  user={user}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ExerciseSelection;
