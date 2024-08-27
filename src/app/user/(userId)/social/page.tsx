import Social from "@/components/userPage/social/social";
import { getAllUsers, getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Social",
};

const UserClients = async () => {
  const allUsers = await getAllUsers();

  return (
    <div>
      <Social allUsers={allUsers} />
    </div>
  );
};
export default UserClients;
