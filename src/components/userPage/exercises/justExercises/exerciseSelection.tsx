"use client";

import { useState } from "react";
import Image from "next/image";
import { ListIcon, SearchIcon, Trash2Icon } from "lucide-react";
import ExerciseTag from "./exerciseTag";
import { useRouter } from "next/navigation";

interface ExerciseTagProps {
  user: User;
}

const ExerciseSelection: React.FC<ExerciseTagProps> = ({ user }) => {
  const [select, setSelect] = useState<string>("Search");
  const muscleSelect = select as Muscles;
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
          <div className="flex h-full w-full flex-col items-center justify-start gap-y-4 px-4 pt-2">
            <div className="flex w-full flex-col items-center justify-center gap-y-2">
              <h3 className="text-4xl font-medium text-neutral-800 md:text-5xl xl:text-6xl dark:text-neutral-300">
                All
              </h3>
              <div className="flex h-6 w-full items-center">
                <div className="relative flex w-full flex-row">
                  <input
                    className="w-full rounded-l-full border border-neutral-200 pl-2 pr-10 text-neutral-800 outline-none"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  ></input>
                  <SearchIcon className="pointer-events-none absolute -bottom-3 -right-2 size-11 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <div className="pointer-events-none absolute top-0 h-10 w-full bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-900" />
              <div className="remove-scrollbar overflow-show flex h-[470px] w-full flex-col items-start justify-start overscroll-contain">
                <ExerciseTag
                  user={user}
                  searchFunction={(exercise) =>
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
          <div className="flex h-full w-full flex-col items-center justify-start gap-y-4 px-4 pt-2">
            <div className="flex w-full flex-col items-center justify-center gap-y-2">
              <h3 className="text-4xl font-medium text-neutral-800 md:text-5xl xl:text-6xl dark:text-neutral-300">
                {select}
              </h3>
              <div className="flex h-6 w-full items-center">
                <div className="relative flex w-full flex-row">
                  <input
                    className="w-full rounded-l-full border border-neutral-200 pl-2 pr-10 text-neutral-800 outline-none"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  ></input>
                  <SearchIcon className="pointer-events-none absolute -bottom-3 -right-2 size-11 rounded-full bg-neutral-100 dark:bg-neutral-900" />
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <div className="pointer-events-none absolute top-0 h-10 w-full bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-900" />
              <div className="remove-scrollbar overflow-show flex h-[470px] w-full flex-col items-start justify-start overscroll-contain">
                <ExerciseTag
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
              <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-900" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExerciseSelection;
