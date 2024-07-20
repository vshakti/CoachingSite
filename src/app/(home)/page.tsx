import Slideshow from "@/components/heroSlides";
import { Check, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const images = [
    "/placeholders/1.jpg",
    "/placeholders/1.jpg",
    "/placeholders/1.jpg",
    "/placeholders/1.jpg",
  ];

  return (
    <div className="flex flex-col bg-zinc-50 xl:h-screen">
      <div className="h-max xl:h-full bg-zinc-50 grid-flow-col xl:columns-2 gap-x-0">
        <div className="flex flex-col items-center justify-start pt-16 xl:col-span-1 gap-y-2 h-screen xl:h-full">
          <h1 className="text-slate-800 font-medium h-fill text-3xl w-4/5 md:text-4xl xl:text-4xl">
            Tracking your{" "}
            <span className="bg-red-600/80 px-1 text-white font-semibold">
              progress
            </span>{" "}
            was never this easy!
          </h1>

          <h2 className="text-slate-800 mt-4 xl:mt-0 font-medium h-fill text-xl w-4/5 md:text-2xl xl:text-xl">
            The “training” let you plan all your trainig days and weeks at a
            buttons touch, saving all your reps, sets, weights and much more so{" "}
            <span className="font-semibold underline">YOU</span> or your{" "}
            <span className="font-semibold underline">COACH</span> can review it
            later and keep track of everything.
          </h2>

          <div className="pt-2 mt-4 xl:mt-0 flex flex-col items-start justify-start w-4/5">
            <div className="flex flex-row w-full">
              <Check className="size-5 h-full flex items-center text-red-600 md:size-10 xl:size-8" />
              <p className="text-base md:text-xl h-full flex items-center">
                Create custom templates for yourself or your clients
              </p>
            </div>
            <div className="flex flex-row w-full">
              <Check className="size-5 h-full flex items-center text-red-600 md:size-10 xl:size-8" />
              <p className="text-base md:text-xl h-full flex items-center">
                Share your progress with your friends or your coach
              </p>
            </div>
            <div className="flex flex-row w-full">
              <Check className="size-5 h-full flex items-center text-red-600 md:size-10 xl:size-8" />
              <p className="text-base md:text-xl h-full flex items-center">
                Save everything from sets and reps to video recordings
              </p>
            </div>
          </div>

          <div className="flex mt-4 xl:mt-0 flex-col sm:flex-row items-center sm:items-start gap-5">
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

          <div className="flex flex-col justify-between items-center sm:items-start">
            <div className="flex w-full items-center justify-center gap-0.5">
              <Star className="size-4 text-red-600 fill-red-600" />
              <Star className="size-4 text-red-600 fill-red-600" />
              <Star className="size-4 text-red-600 fill-red-600" />
              <Star className="size-4 text-red-600 fill-red-600" />
              <Star className="size-4 text-red-600 fill-red-600" />
            </div>
            <p>
              More than <span className="font-semibold">5.175</span> trainees
              using it
            </p>
          </div>
        </div>

        <div className="xl:col-span-2 flex-col flex items-center gap-y-6 justify-start pt-16 px-4 h-screen xl:h-full">
          <Slideshow images={images} interval={3500} />
          <div>
            <button className="bg-red-600/80 md:text-5xl text-4xl px-4 pt-1 rounded-lg font-semibold text-white">
              JOIN NOW FOR FREE
            </button>
          </div>
        </div>
      </div>

      <footer className="w-full h-16 bg-zinc-200 flex flex-row items-center justify-evenly text-zinc-500">
        <span>POLICY</span>
        <span>POLICY</span>
        <span>POLICY</span>
      </footer>
    </div>
  );
}
