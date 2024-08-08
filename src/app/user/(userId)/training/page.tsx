import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Training from "@/components/userPage/training/training";

export const metadata = {
  title: "Training",
};

const UserTraining = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  if (!user) {
    redirect(`/`);
  }

  return (
    <div>
      <Training />
    </div>
  );
};
export default UserTraining;
