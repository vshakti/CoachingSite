import Slideshow from "@/components/heroSlides";
import {
  BarChart3Icon,
  DumbbellIcon,
  LayoutListIcon,
  MessagesSquareIcon,
  PlusIcon,
  Star,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 xl:h-screen xl:gap-y-16 dark:bg-zinc-800">
      <div className="h-full grid-flow-col gap-x-0 bg-zinc-50 xl:h-5/6 xl:columns-2 dark:bg-zinc-800">
        <div className="flex h-full flex-col items-center justify-center pt-10 xl:col-span-1 xl:pt-0">
          oi
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center xl:pt-10">
          {" "}
          <h1 className="h-fill w-full text-center text-3xl font-medium text-slate-800 md:text-4xl xl:text-2xl dark:text-zinc-100">
            Tracking your{" "}
            <span className="bg-sky-600/80 px-1 font-semibold text-white dark:text-zinc-100">
              progress
            </span>{" "}
            was never this easy!
          </h1>
          <h2 className="h-fill mt-4 w-full px-4 text-center text-xl font-medium text-slate-800 md:text-2xl xl:mt-2 xl:text-base dark:text-zinc-100">
            <span className="bg-sky-600/80 px-1 font-semibold tracking-widest text-white dark:text-zinc-100">
              IGNIS
            </span>{" "}
            let you plan all your trainig days and weeks at a buttons touch,
            saving all your reps, sets, weights and much more so{" "}
            <span className="font-semibold underline">YOU</span> or your{" "}
            <span className="font-semibold underline">COACH</span> can review it
            later and keep track of everything.
          </h2>
          <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-y-4 py-16 lg:grid-cols-3 lg:grid-rows-2 xl:py-0 dark:text-zinc-100">
            <div className="flex flex-col items-center justify-start gap-y-2 xl:gap-y-0.5 xl:pt-6">
              <VideoIcon className="size-16 rounded-full bg-sky-500/75 p-4 text-white xl:size-8 xl:p-1 dark:bg-sky-600/90" />
              <h4 className="w-full text-center text-xl font-medium xl:text-base">
                Form checks
              </h4>
              <span className="w-3/4 text-center text-xs">
                Save videos and commentaries of your exercises
              </span>
            </div>
            <div className="flex flex-col items-center justify-start gap-y-2 xl:gap-y-0.5 xl:pt-6">
              <MessagesSquareIcon className="size-16 rounded-full bg-sky-500/75 p-4 text-white xl:size-8 xl:p-1 dark:bg-sky-600/90" />
              <h4 className="w-full text-center text-xl font-medium xl:text-base">
                Chat & share
              </h4>
              <span className="w-3/4 text-center text-xs">
                Chat with your coach or friends and share your best lifts and
                your progression
              </span>
            </div>
            <div className="flex flex-col items-center justify-start gap-y-2 xl:gap-y-0.5 xl:pt-6">
              <BarChart3Icon className="size-16 rounded-full bg-sky-500/75 p-4 text-white xl:size-8 xl:p-1 dark:bg-sky-600/90" />
              <h4 className="w-full text-center text-xl font-medium xl:text-base">
                Tracking progress
              </h4>
              <span className="w-3/4 text-center text-xs">
                Every rep and weight added is saved in easy to read charts
              </span>
            </div>
            <div className="flex flex-col items-center justify-start gap-y-2 xl:gap-y-0.5">
              <DumbbellIcon className="size-16 rounded-full bg-sky-500/75 p-4 text-white xl:size-8 xl:p-1 dark:bg-sky-600/90" />
              <h4 className="w-full text-center text-xl font-medium xl:text-base">
                Exercise creation
              </h4>
              <span className="w-3/4 text-center text-xs">
                Exercise creation is as easy and intuitive as in a piece of
                paper
              </span>
            </div>
            <div className="flex flex-col items-center justify-start gap-y-2 xl:gap-y-0.5">
              <LayoutListIcon className="size-16 rounded-full bg-sky-500/75 p-4 text-white xl:size-8 xl:p-1 dark:bg-sky-600/90" />
              <h4 className="w-full text-center text-xl font-medium xl:text-base">
                Periodization
              </h4>
              <span className="w-3/4 text-center text-xs">
                Organizing your training is just as easy as draging and dropping
                your exercises around
              </span>
            </div>
            <div className="flex flex-col items-center justify-start gap-y-2 xl:gap-y-0.5">
              <PlusIcon className="size-16 rounded-full bg-sky-500/75 p-4 text-white xl:size-8 xl:p-1 dark:bg-sky-600/90" />
              <h4 className="w-full text-center text-xl font-medium xl:text-base">
                And much more...
              </h4>
              <span className="w-3/4 text-center text-xs">
                Track your own bodyweight, your form, your RPE and more...
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <div className="flex -space-x-4">
              <Image
                className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                src="/hero-users/user-1.png"
                alt="user 1"
                width={40}
                height={40}
                quality={100}
              />
              <Image
                className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                src="/hero-users/user-2.png"
                alt="user 2"
                width={40}
                height={40}
                quality={100}
              />
              <Image
                className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                src="/hero-users/user-3.png"
                alt="user 3"
                width={40}
                height={40}
                quality={100}
              />
              <Image
                className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                src="/hero-users/user-4.jpg"
                alt="user 4"
                width={40}
                height={40}
                quality={100}
              />
              <Image
                className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                src="/hero-users/user-5.jpg"
                alt="user 5"
                width={40}
                height={40}
                quality={100}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col items-center justify-between sm:items-start xl:gap-y-0.5">
            <div className="flex w-full items-center justify-center gap-0.5">
              <Star className="size-4 fill-sky-600 text-sky-600 dark:text-sky-600/70" />
              <Star className="size-4 fill-sky-600 text-sky-600 dark:text-sky-600/70" />
              <Star className="size-4 fill-sky-600 text-sky-600 dark:text-sky-600/70" />
              <Star className="size-4 fill-sky-600 text-sky-600 dark:text-sky-600/70" />
              <Star className="size-4 fill-sky-600 text-sky-600 dark:text-sky-600/70" />
            </div>
            <p className="dark:text-zinc-100">
              More than <span className="font-semibold">5.175</span> trainees
              using it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
