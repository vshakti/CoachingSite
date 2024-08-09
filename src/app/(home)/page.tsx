import Auth from "@/components/auth";

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
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import OpenModalButton from "@/components/userPage/openModalButton";

export default async function Home() {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  if (user) {
    redirect(`/user/profile`);
  }

  return (
    <div className="flex h-max flex-col items-center justify-start gap-12 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 text-white">
      <div className="flex flex-col items-center justify-center gap-5 pt-52 md:gap-10 md:pt-40">
        <h1 className="font-astro pl-3 text-7xl md:text-9xl">NEBULA</h1>
        <h2 className="text-xl tracking-wider md:text-3xl">
          Your training plataform
        </h2>
      </div>

      <OpenModalButton
        modalId="auth_modal"
        className="rounded-md bg-gradient-to-r from-violet-950/0 via-slate-950 to-violet-950/0 px-10 py-4 text-xl font-black text-white hover:from-violet-900/5 hover:via-purple-950 hover:to-violet-900/5"
      >
        Get Started
      </OpenModalButton>

      <div className="h-32" />

      <div className="flex w-full items-center justify-center py-3 text-3xl text-white/75 md:text-4xl">
        Why should you use Nebula?
      </div>

      <ul className="grid w-full grid-cols-1 items-center justify-start gap-8 px-8 py-4 tracking-wide md:grid-cols-2 lg:grid-cols-3">
        <div className="flex w-full flex-col items-center justify-start gap-y-2 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-3 hover:via-zinc-900">
          <VideoIcon className="size-32" />
          <h4 className="w-full px-4 text-start text-xl font-medium xl:text-base">
            Form checks
          </h4>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-y-2 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-3 hover:via-zinc-900">
          <MessagesSquareIcon className="size-32" />
          <h4 className="w-full px-4 text-start text-xl font-medium xl:text-base">
            Chat & share
          </h4>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-y-2 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-3 hover:via-zinc-900">
          <BarChart3Icon className="size-32" />
          <h4 className="w-full px-4 text-start text-xl font-medium xl:text-base">
            Tracking progress
          </h4>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-y-2 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-3 hover:via-zinc-900">
          <DumbbellIcon className="size-32" />
          <h4 className="w-full px-4 text-start text-xl font-medium xl:text-base">
            Exercise creation
          </h4>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-y-2 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-3 hover:via-zinc-900">
          <LayoutListIcon className="size-32" />
          <h4 className="w-full px-4 text-start text-xl font-medium xl:text-base">
            Periodization
          </h4>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-y-2 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-3 hover:via-zinc-900">
          <PlusIcon className="size-32" />
          <h4 className="w-full px-4 text-start text-xl font-medium xl:text-base">
            And much more...
          </h4>
        </div>
      </ul>

      <Auth />
    </div>
  );
}
