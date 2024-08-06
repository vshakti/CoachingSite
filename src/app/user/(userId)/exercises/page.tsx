import { UserProvider } from "@/lib/context/user";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Exercises from "@/components/userPage/exercises/exercises";
import { ExerciseProvider } from "@/lib/context/exerciseAdd";
import { TemplateTypeProvider } from "@/lib/context/templateType";

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
    <UserProvider>
      <ExerciseProvider>
        <TemplateTypeProvider>
          <div>
            <Exercises />
          </div>
        </TemplateTypeProvider>
      </ExerciseProvider>
    </UserProvider>
  );
};
export default UserExercises;
