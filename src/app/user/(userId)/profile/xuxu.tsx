import { LoaderIcon, PenIcon, UserRoundIcon } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div className="flex w-full flex-col gap-y-2 p-4 antialiased lg:gap-y-4">
      <header className="grid justify-evenly gap-x-2 gap-y-6 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 py-4 md:grid-cols-3">
        <div className="flex items-center justify-center">
          <UserRoundIcon className="size-48 rounded-full border-2 border-neutral-400 bg-neutral-500 text-neutral-300" />
        </div>

        <div className="flex flex-col items-center justify-center gap-y-6 py-2 pb-2 md:items-start md:justify-start dark:text-neutral-200">
          <div className="flex w-full flex-col gap-y-4">
            <h1 className="flex w-full items-center justify-center bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-8 py-2 text-center text-3xl">
              <LoaderIcon className="size-6 animate-spin" />
            </h1>
            <div className="flex flex-col items-center gap-y-4 md:items-start">
              <div className="flex w-full items-center justify-center bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-6 py-1">
                <LoaderIcon className="size-6 animate-spin" />
              </div>
              <div className="flex w-full items-center justify-center bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-6 py-1">
                <LoaderIcon className="size-6 animate-spin" />
              </div>
            </div>
          </div>

          <div className="rounded-md bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-8 py-2 font-medium md:hidden">
            <div className="flex flex-row gap-x-2 text-neutral-100">
              <PenIcon />
              <span>EDIT PROFILE</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="hidden rounded-md bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-8 py-2 font-medium md:block">
            <div className="flex flex-row gap-x-2 text-neutral-100">
              <PenIcon />
              <span>EDIT PROFILE</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-rows-1 rounded-t-3xl px-4 lg:grid-cols-2 lg:py-8">
        <div className="flex items-center justify-center p-2">
          <ul className="flex h-full w-full flex-col justify-start gap-y-6 p-4 text-xs font-medium text-white md:w-2/3 md:text-xl">
            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Age</span>
              <LoaderIcon className="size-6 animate-spin" />
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Gender</span>
              <LoaderIcon className="size-6 animate-spin" />
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Email</span>
              <LoaderIcon className="size-6 animate-spin" />
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Phone</span>
              <LoaderIcon className="size-6 animate-spin" />
            </div>
          </ul>
        </div>

        <div className="row-span-1 flex items-center justify-start p-2 text-white md:items-start">
          <div className="flex h-full w-full flex-col gap-y-4 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 p-2 px-4 text-xs font-medium md:text-xl">
            <div className="flex h-full w-full flex-col items-center justify-start">
              <span>Bio</span>
              <div className="flex h-full w-full items-center justify-center">
                <LoaderIcon className="size-10 animate-spin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
