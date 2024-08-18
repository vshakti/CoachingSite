import Social from "@/components/userPage/social/social";
import { getAllUsers, getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Social",
};

const UserClients = async () => {
  const [userResponse, allUsersResponse] = await Promise.all([
    getLoggedInUser(),
    getAllUsers(),
  ]);

  const user: User = userResponse;
  const allUsers: User[] = allUsersResponse;

  if (!user) {
    redirect(`/`);
  }

  return (
    <div>
      <Social user={user} allUsers={allUsers} />
    </div>
  );
};
export default UserClients;
