import { getLoggedInUser } from "@/lib/actions/user.actions";
import WeeksCollection from "./weeksCollection";
import { WeekDays } from "@/constants";
import TrainingWeekDetails from "./trainingWeekDetails";
import { TrainingProvider } from "@/lib/context/trainingWeek";

const Training = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  // console.log(
  //   user.trainingWeek.map((training, t) =>
  //     training.trainingDaySpecifics.map((rest, r) => rest.isRest),
  //   ),
  // );

  return (
    <TrainingProvider>
      <div className="flex h-max w-full flex-col gap-6 p-6 text-white antialiased md:ml-6">
        <div className="flex flex-col rounded-lg bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 p-3 md:mr-5">
          <h1 className="flex h-10 w-full items-center justify-center text-xl antialiased md:text-3xl lg:text-4xl">
            COLLECTION OF TRAINING WEEKS
          </h1>
          <WeeksCollection user={user} />
        </div>

        <div className="flex h-max w-full flex-col gap-3 md:pr-5">
          {WeekDays.map((day, i) => (
            <div
              key={i}
              className="flex h-full w-full bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0"
            >
              <TrainingWeekDetails user={user} index={i}>
                <span>{day}</span>
              </TrainingWeekDetails>
            </div>
          ))}
        </div>
      </div>
    </TrainingProvider>
  );
};

export default Training;
