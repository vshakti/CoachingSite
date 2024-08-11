import ProfilePicture from "@/components/userPage/profile/profilePicture";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import UserUpdateModal from "./userUpdateModal";
import OpenModalButton from "../openModalButton";
import { PenIcon } from "lucide-react";

const Profile = async () => {
  const userResponse = await getLoggedInUser();
  const user: User = userResponse;

  function calculateAge(birthday: Date | undefined) {
    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    }
  }

  return (
    <div className="flex w-full flex-col gap-y-2 p-4 antialiased lg:gap-y-4">
      <header className="grid justify-evenly gap-x-2 gap-y-6 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 py-4 md:grid-cols-3">
        <ProfilePicture />
        <div className="flex flex-col items-center justify-center gap-y-6 py-2 pb-2 md:items-start md:justify-start dark:text-neutral-200">
          <div className="flex flex-col gap-y-4">
            <h1 className="flex items-center justify-center text-center text-3xl md:justify-start md:text-start md:text-5xl">
              {user?.name}
            </h1>
            <div className="flex flex-col items-center gap-y-4 md:items-start">
              Amigos: [Array de Amigos]{" "}
              <span>Clientes: [Array de Clientes]</span>
            </div>
          </div>

          <OpenModalButton
            modalId="user_update_modal"
            className="rounded-md bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-8 py-2 font-medium hover:via-cyan-500 md:hidden"
          >
            <div className="flex flex-row gap-x-2 text-neutral-100">
              <PenIcon />
              <span>EDIT PROFILE</span>
            </div>
          </OpenModalButton>
        </div>

        <div className="flex items-center justify-center">
          <OpenModalButton
            modalId="user_update_modal"
            className="hidden rounded-md bg-gradient-to-r from-neutral-950/0 via-neutral-950 to-neutral-950/0 px-8 py-2 font-medium hover:via-cyan-500 md:block"
          >
            <div className="flex flex-row gap-x-2 text-neutral-100">
              <PenIcon />
              <span>EDIT PROFILE</span>
            </div>
          </OpenModalButton>
        </div>
      </header>

      <div className="grid grid-rows-1 rounded-t-3xl px-4 lg:grid-cols-2 lg:py-8">
        <div className="flex items-center justify-center p-2">
          <ul className="flex h-full w-full flex-col justify-start gap-y-6 p-4 text-xs font-medium text-white md:w-2/3 md:text-xl">
            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Age</span>
              {calculateAge(user.birthDate)}
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Gender</span>
              <span>{user?.gender}</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Email</span>
              <span>{user?.email}</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 px-4 pb-1 tracking-wide">
              <span>Phone</span>
              <span>{user?.phone}</span>
            </div>
          </ul>
        </div>

        <div className="row-span-1 flex items-center justify-start p-2 text-white md:items-start">
          <div className="flex h-full w-full flex-col gap-y-4 bg-gradient-to-r from-neutral-950/0 via-violet-950 to-neutral-950/0 p-2 px-4 text-xs font-medium md:text-xl">
            <div className="flex flex-col items-center justify-center">
              <span>Bio</span>
              <span>{user?.description}</span>
            </div>
          </div>
        </div>
      </div>
      <UserUpdateModal />
    </div>
  );
};

export default Profile;
