import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Training from "@/components/userPage/training/training";

export const metadata = {
  title: "Training",
};

const UserTraining = () => {
  return (
    <div>
      <Training />
    </div>
  );
};
export default UserTraining;
