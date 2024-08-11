import { WeightIcon } from "lucide-react";

const AverageAndFeedbackStatic = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly text-slate-500">
      <div className="flex w-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-3">
        <span className="flex flex-row items-center gap-1 text-xl">
          Average <WeightIcon className="size-5" />
        </span>
        <div className="rounded-full bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-700 p-1">
          <div className="flex size-16 flex-col items-center justify-center rounded-full bg-neutral-950 text-white">
            ...
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-3">
        <span className="flex flex-row items-center gap-1 text-xl text-slate-600">
          Average sets
        </span>
        <div className="rounded-full bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-700 p-1">
          <div className="flex size-16 flex-col items-center justify-center rounded-full bg-neutral-950 text-white">
            ...
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-3">
        <span className="flex flex-row items-center gap-1 text-xl">
          Average reps
        </span>
        <div className="rounded-full bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-700 p-1">
          <div className="flex size-16 flex-col items-center justify-center rounded-full bg-neutral-950 text-white">
            ...
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-1 bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-4 py-3">
        <span className="flex flex-row items-center gap-1 text-xl">
          Average RPE
        </span>
        <div className="rounded-full bg-gradient-to-br from-indigo-600 via-cyan-500 to-indigo-700 p-1">
          <div className="flex size-16 flex-col items-center justify-center rounded-full bg-neutral-950 text-white">
            ...
          </div>
        </div>
      </div>
    </div>
  );
};
export default AverageAndFeedbackStatic;
