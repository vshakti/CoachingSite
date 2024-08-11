import { useState, useEffect } from "react";
import { ChevronsRightIcon } from "lucide-react";

const AnimatedColoredChevrons = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalIcons = 8;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalIcons);
    }, 100);

    return () => clearInterval(interval);
  }, [totalIcons]);

  return (
    <div className="flex flex-row md:gap-4 xl:gap-5">
      {[...Array(totalIcons)].map((_, index) => (
        <ChevronsRightIcon
          key={index}
          className={`size-6 md:size-9 xl:size-11 ${index === activeIndex ? "text-cyan-500 opacity-100" : "text-current opacity-50"}`}
        />
      ))}
    </div>
  );
};

export default AnimatedColoredChevrons;
