import Image from "next/image";

const LoadingRoot = () => {
  return (
    <div className="flex h-full w-full animate-pulse flex-col items-center justify-center gap-2 pt-20">
      <Image
        src="/logo/nebula2.png"
        height={300}
        quality={100}
        width={300}
        alt="nebula"
      />
      <h1 className="w-full text-center font-astro text-2xl text-white md:text-5xl">
        LOADING NEBULA...
      </h1>
    </div>
  );
};
export default LoadingRoot;
