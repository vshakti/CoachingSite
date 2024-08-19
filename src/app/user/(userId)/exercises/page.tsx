import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Exercises from "@/components/userPage/exercises/exercises";

export const metadata = {
  title: "Exercises",
};

const UserExercises = () => {
  return (
    <div>
      <Exercises />
    </div>
  );
};
export default UserExercises;
