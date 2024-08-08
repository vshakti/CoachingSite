import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Exercises from "@/components/userPage/exercises/exercises";

export const metadata = {
  title: "Exercises",
};

const UserExercises = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  if (!user) {
    redirect(`/`);
  }

  return (
    <div>
      <Exercises />
    </div>
  );
};
export default UserExercises;
