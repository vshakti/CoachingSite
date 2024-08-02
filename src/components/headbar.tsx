import Link from "next/link";
import Image from "next/image";
import { UserHeadbar } from "./userHeadbar";
import { UserProvider } from "@/lib/context/user";

const Headbar = () => {
  return (
    <UserProvider>
      <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b bg-gradient-to-l from-slate-900/75 via-violet-900/75 to-slate-900/75 backdrop-blur-lg transition-all">
        <div className="flex h-14 items-center justify-between border-b border-neutral-300 px-4">
          <div className="z-40 flex items-center gap-x-2 font-semibold">
            <Image
              src="/logo/const1.png"
              width={400}
              height={400}
              quality={100}
              alt="logo"
              className="size-12"
            />
          </div>

          <div className="flex h-full items-center space-x-3">
            <div className="">
              <UserHeadbar />
            </div>

            <div className="hidden h-8 w-px bg-neutral-200 sm:block" />

            <Link
              href={"/donation"}
              className="rounded-md bg-violet-900 px-5 py-2 font-medium text-white hover:bg-violet-800"
            >
              Donate
            </Link>
          </div>
        </div>
      </nav>
    </UserProvider>
  );
};

export default Headbar;
