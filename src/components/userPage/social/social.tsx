import { getLoggedInUser, ShowUserPicture } from "@/lib/actions/user.actions";

import Image from "next/image";
import UserSearch from "./userSearch";
import UserDetails from "./userDetails";

interface SocialProps {
  allUsers: User[];
}

const Social = async ({ allUsers }: SocialProps) => {
  const userResponse = await getLoggedInUser();

  const user: User = userResponse;

  const userImages = await Promise.all(
    allUsers.map(async (user) => {
      if (user.pictureUrl) {
        try {
          const base64String = await ShowUserPicture(user.pictureUrl);
          return {
            id: user.$id,
            base64String: `data:image/png;base64,${base64String}`,
          };
        } catch (error) {
          console.error(`Failed to fetch image for user ${user.$id}`, error);
          return { id: user.$id, base64String: null };
        }
      }
      return { id: user.$id, base64String: null };
    }),
  );

  const imageMap = userImages.reduce(
    (acc, { id, base64String }) => {
      acc[id] = base64String;
      return acc;
    },
    {} as { [key: string]: string },
  );

  return (
    <div className="flex h-full w-full flex-col p-3 text-white lg:pl-6">
      <div className="flex h-full w-full flex-col gap-6">
        <div className="flex h-16 items-center bg-gradient-to-r from-zinc-950/0 via-violet-950 to-zinc-950/0 p-2">
          <UserSearch
            currentUser={user}
            allUsers={allUsers}
            userImages={imageMap}
          />
        </div>
        <div className="bg-gradient-to-r from-zinc-950/0 via-violet-950 to-zinc-950/0 p-2">
          <UserDetails userImages={imageMap} />
        </div>
      </div>
    </div>
  );
};

export default Social;
