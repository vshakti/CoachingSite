import { getLoggedInUser, ShowUserPicture } from "@/lib/actions/user.actions";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

const NavbarProfile = async () => {
  const userResponse = await getLoggedInUser();
  const user: User = userResponse;
  const avatarResponse = await ShowUserPicture(user.pictureId);
  const userAvatar = avatarResponse;
  let avatar;

  if (userAvatar) {
    const blob = await new Blob([userAvatar], { type: "image/jpeg" });

    avatar = convertFileToUrl(blob);
  }

  return (
    <div className="flex w-full items-center justify-center gap-x-4 gap-y-1 pb-2 pt-5 md:flex-col md:pl-3">
      <div className="size-[6rem] border md:size-[9rem] 2xl:size-[10rem]">
        {user?.pictureUrl ? (
          <div>
            <Image
              id="img"
              width={40}
              height={40}
              src={`${avatar}`}
              className="size-20"
              alt=""
            />
          </div>
        ) : (
          <div>num tem</div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 text-center text-xs font-medium md:w-full md:gap-y-1 md:text-base xl:text-lg 2xl:text-2xl">
        <span className="dark:text-neutral-300">
          {!user ? (
            <div>loading</div>
          ) : (
            <p className="text-3xl md:text-xl dark:text-neutral-300">
              {user.name}
            </p>
          )}
        </span>
        <div className="dark:text-neutral-300">
          Coaching: {""}
          <span className="tracking-wide text-green-600 dark:text-green-400">
            ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarProfile;
