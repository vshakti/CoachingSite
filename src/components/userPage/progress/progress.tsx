import AverageAndFeedback from "./averageAndFeedback";
import AverageAndFeedbackStatic from "./averageAndFeedbackStatic";
import ExerciseChart from "./exerciseChart";
import ExerciseSelector from "./exerciseSelector";

interface ProgressProps {
  user: User;
}

export const Progress = ({ user }: ProgressProps) => {
  return (
    <div className="font grid h-screen w-full gap-6 p-6 text-white antialiased lg:ml-6 lg:grid-cols-6 lg:grid-rows-6">
      <div className="flex flex-col gap-4 lg:col-span-4 lg:row-span-6">
        <div className="bg-gradient-to-r from-slate-950/0 via-violet-950 to-slate-950/10">
          <ExerciseSelector user={user} />
        </div>
        <div className="h-full bg-gradient-to-r from-slate-950/0 via-violet-950 to-slate-950/10">
          <ExerciseChart />
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-950/0 via-violet-950 to-slate-950/10 lg:col-span-2 lg:col-start-5 lg:row-span-6 lg:row-start-1">
        <AverageAndFeedback>
          <AverageAndFeedbackStatic />
        </AverageAndFeedback>
      </div>
    </div>
  );
};
