import { Progress } from "@/components/userPage/progress/progress";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { TrackingExerciseContextProvider } from "@/lib/context/exerciseTracking";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Progress",
};

const UserProgress = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  if (!user) {
    redirect(`/`);
  }

  return (
    <TrackingExerciseContextProvider>
      <div className="flex h-full">
        <Progress user={user} />
      </div>
    </TrackingExerciseContextProvider>
  );
};
export default UserProgress;
