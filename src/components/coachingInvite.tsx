import { getLoggedInUser } from "@/lib/actions/user.actions";
import CoachInviteMessage from "./coachInviteMessage";

const CoachingInvite = async () => {
  const userResponse = await getLoggedInUser();
  const user = userResponse;

  return (
    <>
      <CoachInviteMessage user={user} />
    </>
  );
};
export default CoachingInvite;
