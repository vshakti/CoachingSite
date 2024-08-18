import { ShowUserPicture } from "@/lib/actions/user.actions";
import dynamic from "next/dynamic";

import UserSearch from "./userSearch";
const UserDetails = dynamic(() => import("./userDetails"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CoachedUsersList = dynamic(() => import("./coachedUsersList"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface SocialProps {
  allUsers: User[];
  user: User;
}

const Social = async ({ allUsers, user }: SocialProps) => {
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

        <UserDetails currentUser={user} userImages={imageMap} />
        <div className="flex w-full flex-col items-center justify-start bg-gradient-to-r from-zinc-950/0 via-violet-950 to-zinc-950/0 py-3">
          <h1 className="bg-gradient-to-r from-transparent via-zinc-950 to-transparent px-12 py-1 text-3xl antialiased">
            PERSONAL CLIENTS
          </h1>
          <div className="grid h-max w-full gap-4 p-4">
            <CoachedUsersList currentUser={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
