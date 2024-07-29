import Profile from "@/components/userPage/profile/profile";
import { UserProvider } from "@/lib/context/user";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const UserControlPanel = async () => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  if (!user) {
    redirect(`/`);
  }

  return (
    <UserProvider>
      <div className="flex h-full">
        <Profile />
      </div>
    </UserProvider>
  );
};
export default UserControlPanel;
