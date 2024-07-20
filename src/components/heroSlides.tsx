"use client";

import {
  BarChartBig,
  MessagesSquare,
  Video,
  MousePointerClick,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SlideshowProps {
  images: string[];
  interval?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setOpacity(1);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="flex flex-col items-center gap-y-2">
      {currentIndex === 0 && (
        <div
          className={`flex flex-row items-center gap-x-1 transition-opacity duration-500 ease-in-out ${
            opacity === 0 ? "opacity-0" : "opacity-100"
          }`}
        >
          <BarChartBig className="size-9 " />
          <h1 className="text-zinc-800 border-t-2 border-b-2 md:text-5xl lg:text-6xl xl:text-5xl border-zinc-800 px-2 rounded-sm text-3xl text-center w-full font-medium tracking-wide">
            EXERCISES CHARTS
          </h1>
          <BarChartBig className="size-9 " />
        </div>
      )}
      {currentIndex === 1 && (
        <div
          className={`flex flex-row items-center gap-x-1 transition-opacity duration-500 ease-in-out ${
            opacity === 0 ? "opacity-0" : "opacity-100"
          }`}
        >
          <MousePointerClick className="size-9 " />
          <h1 className="text-zinc-800 border-t-2 border-b-2 md:text-5xl lg:text-6xl xl:text-5xl border-zinc-800 px-2 rounded-sm text-3xl text-center w-full font-medium tracking-wide">
            EASY TO USE
          </h1>
          <MousePointerClick className="size-9 " />
        </div>
      )}
      {currentIndex === 2 && (
        <div
          className={`flex flex-row items-center gap-x-1 transition-opacity duration-500 ease-in-out ${
            opacity === 0 ? "opacity-0" : "opacity-100"
          }`}
        >
          <MousePointerClick className="size-9 " />
          <h1 className="text-zinc-800 border-t-2 border-b-2 md:text-5xl lg:text-6xl xl:text-5xl border-zinc-800 px-2 rounded-sm text-3xl text-center w-full font-medium tracking-wide">
            FORM CHECKS
          </h1>
          <MousePointerClick className="size-9 " />
        </div>
      )}
      {currentIndex === 3 && (
        <div
          className={`flex flex-row items-center gap-x-1 transition-opacity duration-500 ease-in-out ${
            opacity === 0 ? "opacity-0" : "opacity-100"
          }`}
        >
          <MessagesSquare className="size-9 " />
          <h1 className="text-zinc-800 border-t-2 border-b-2 md:text-5xl lg:text-6xl xl:text-5xl border-zinc-800 px-2 rounded-sm text-3xl text-center w-full font-medium tracking-wide">
            CHAT & SHARE
          </h1>
          <MessagesSquare className="size-9 " />
        </div>
      )}
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className={`transition-opacity duration-500 ease-in-out ${
          opacity === 0 ? "opacity-0" : "opacity-100"
        }`}
        width={350}
        height={350}
        quality={100}
      />
    </div>
  );
};

export default Slideshow;
