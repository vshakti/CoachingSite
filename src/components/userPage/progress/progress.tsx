import AverageAndFeedback from "./averageAndFeedback";
import AverageAndFeedbackStatic from "./averageAndFeedbackStatic";
import ExerciseSelector from "./exerciseSelector";
import dynamic from "next/dynamic";
const ExerciseChart = dynamic(() => import("./exerciseChart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface ProgressProps {
  user: User;
  className: string;
}

export const Progress = ({ user, className }: ProgressProps) => {
  return (
    <div className={className}>
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
