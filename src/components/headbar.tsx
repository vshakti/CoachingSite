import Link from "next/link";
import Image from "next/image";
import { UserHeadbar } from "./userHeadbar";

const Headbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-slate-950 bg-gradient-to-l from-slate-900/75 via-violet-900/75 to-slate-900/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="z-40 flex items-center gap-x-2 font-astro">
          <Image
            src="/logo/nebula2.png"
            width={400}
            height={400}
            quality={100}
            alt="logo"
            className="size-10 rounded-full border border-slate-950"
          />
          <span className="animate-color-change text-sm">Nebula</span>
        </div>

        <div className="flex h-full items-center space-x-3">
          <div className="">
            <UserHeadbar />
          </div>

          <div className="hidden h-8 w-px bg-white sm:block" />

          <Link
            href={"/donation"}
            className="rounded-md bg-gradient-to-r from-violet-950/5 via-violet-950 to-violet-950/5 px-5 py-2 font-medium text-white hover:from-violet-900/5 hover:via-violet-900 hover:to-violet-900/5"
          >
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Headbar;
