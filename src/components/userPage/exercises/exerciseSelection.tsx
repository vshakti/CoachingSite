"use client";

import { useState } from "react";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import ExerciseTag from "./exerciseTag";

interface ExerciseTagProps {
  user: User;
}

const ExerciseSelection: React.FC<ExerciseTagProps> = ({ user }) => {
  const [select, setSelect] = useState("Search");
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

  return (
    <div className="flex h-max w-full flex-row px-1">
      <ul className="flex flex-col items-end justify-center gap-y-0.5">
        <button
          onClick={() => {
            setSelect("Search");
          }}
          className={`${select === "Search" ? "h-14 border-neutral-300 bg-neutral-200 dark:bg-neutral-900" : "h-9 dark:bg-neutral-800"} rounded-l-lg border border-r-0 border-neutral-200 bg-neutral-200 px-2 transition-all dark:border-neutral-700/25 dark:text-neutral-200`}
        >
          <SearchIcon
            className={`${select === "Search" ? "size-11 md:size-12" : "size-5 md:size-7"} text-neutral-800 dark:text-neutral-300`}
          />
        </button>
        {selection.map((exercise, index) => (
          <button
            key={index}
            onClick={() => {
              setSelect(exercise);
            }}
            className={`${select === exercise ? "h-14 border-neutral-300 bg-neutral-200 dark:bg-neutral-900" : "h-9 dark:bg-neutral-800"} rounded-l-lg border border-r-0 border-neutral-200 bg-neutral-200 px-2 transition-all dark:border-neutral-700/25 dark:text-neutral-200`}
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
      <div className="flex w-full items-start justify-start rounded-r-lg border border-l-0 border-neutral-200 bg-neutral-50 px-2 dark:border-neutral-700/25 dark:bg-neutral-900 dark:text-neutral-200">
        {select === "Search" ? (
          <div className="flex h-full w-full flex-col items-center justify-start gap-y-4 px-6 pt-12">
            <div className="flex h-6 w-full items-center">
              <div className="relative flex w-full flex-row">
                <input
                  className="w-full rounded-l-full border border-neutral-200 pl-2 pr-10 text-neutral-800 outline-none"
                  placeholder="Exercise name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
                <SearchIcon className="pointer-events-none absolute -bottom-3 -right-2 size-11 rounded-full bg-neutral-100 dark:bg-neutral-900" />
              </div>
            </div>

            <div className="relative w-full">
              <div className="pointer-events-none absolute top-0 h-10 w-full bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-900" />
              <div className="remove-scrollbar overflow-show flex h-[470px] w-full flex-col items-start justify-start overscroll-contain">
                <ExerciseTag
                  user={user}
                  filterFunction={(exercise) =>
                    exercise.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  }
                />
              </div>
              <div className="pointer-events-none absolute bottom-0 h-10 w-full bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-900" />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-start gap-y-4 px-6 pt-12">
            <h3 className="text-5xl font-medium text-neutral-800 dark:text-neutral-300">
              {select}
            </h3>

            <div className="relative w-full">
              <div className="pointer-events-none absolute top-0 h-10 w-full bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-900" />
              <div className="remove-scrollbar overflow-show flex h-[470px] w-full flex-col items-start justify-start overscroll-contain py-4">
                <ExerciseTag
                  filterFunction={(exercise: Exercise) =>
                    exercise.muscles === select
                  }
                  user={user}
                />
              </div>
              <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-900" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExerciseSelection;
