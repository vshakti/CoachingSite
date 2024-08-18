import { Progress } from "@/components/userPage/progress/progress";
import { getLoggedInUser } from "@/lib/actions/user.actions";

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
    <div className="flex h-full">
      <Progress
        user={user}
        className="font grid h-screen w-full gap-6 p-6 text-white antialiased lg:ml-6 lg:grid-cols-6 lg:grid-rows-6"
      />
    </div>
  );
};
export default UserProgress;
