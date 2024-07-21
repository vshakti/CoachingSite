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
    <div className="relative size-[24rem] md:size-[40rem] lg:size-[46rem] xl:size-[30rem]">
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className={`transition-opacity duration-500 ease-in-out ${
          opacity === 0 ? "opacity-0" : "opacity-100"
        }`}
        layout="fill"
        quality={100}
      />
    </div>
  );
};

export default Slideshow;
