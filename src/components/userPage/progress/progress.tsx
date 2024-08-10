import ExerciseSelector from "./exerciseSelector";

interface ProgressProps {
  user: User;
}

export const Progress = ({ user }: ProgressProps) => {
  return (
    <div className="font grid h-screen w-full gap-6 p-6 text-white antialiased md:ml-6 md:grid-cols-6 md:grid-rows-6">
      <div className="bg-gradient-to-r from-slate-950/0 via-violet-950 to-slate-950/10 md:col-span-4 md:row-span-2">
        <ExerciseSelector user={user} />
      </div>
      <div className="bg-gradient-to-r from-slate-950/0 via-violet-950 to-slate-950/10 md:col-span-4 md:row-span-4">
        aaa
      </div>
      <div className="bg-gradient-to-r from-slate-950/0 via-violet-950 to-slate-950/10 md:col-span-2 md:col-start-5 md:row-span-6 md:row-start-1"></div>
    </div>
  );
};
