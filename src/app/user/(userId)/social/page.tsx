import Social from "@/components/userPage/social/social";
import { getAllUsers, getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Social",
};

const UserClients = async () => {
  const userResponse = await getLoggedInUser();
  const user: User = userResponse;
  const allUsersResponse = await getAllUsers();
  const allUsers: User[] = allUsersResponse;

  if (!user) {
    redirect(`/`);
  }

  return (
    <div>
      <Social allUsers={allUsers} />
    </div>
  );
};
export default UserClients;
