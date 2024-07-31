import { UserProvider } from "@/lib/context/user";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Exercises from "@/components/userPage/exercises/exercises";

const UserExercises = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  if (!user) {
    redirect(`/`);
  }

  return (
    <UserProvider>
      <div className="flex h-full">
        <Exercises />
      </div>
    </UserProvider>
  );
};
export default UserExercises;
