import Profile from "@/components/userPage/profile/profile";
import { UserProvider } from "@/lib/context/user";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile",
};

const UserProfile = async () => {
  return (
    <div className="flex h-full">
      <Profile />
    </div>
  );
};
export default UserProfile;
