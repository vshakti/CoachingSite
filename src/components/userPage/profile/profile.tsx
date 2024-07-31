import { UserProvider } from "@/lib/context/user";
import ProfilePicture from "@/components/userPage/navbar/profilePicture";
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
    <UserProvider>
      <div className="flex h-max w-full flex-col gap-y-4 bg-neutral-50 text-neutral-800 antialiased dark:bg-neutral-800">
        <header className="grid justify-evenly gap-x-2 gap-y-6 bg-neutral-100 px-4 py-4 md:grid-cols-3 dark:bg-neutral-900">
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
              className="rounded-md bg-cyan-400 px-4 py-2 font-medium hover:bg-cyan-500 md:hidden"
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
              className="hidden rounded-md bg-cyan-400 px-4 py-2 font-medium hover:bg-cyan-500 md:block"
            >
              <div className="flex flex-row gap-x-2 text-neutral-100">
                <PenIcon />
                <span>EDIT PROFILE</span>
              </div>
            </OpenModalButton>
          </div>
        </header>

        <div className="grid h-screen grid-cols-2 grid-rows-1 rounded-t-3xl px-4 py-8 dark:bg-neutral-800">
          <div className="flex max-h-[480px] items-center justify-center p-2">
            <ul className="flex h-full w-full max-w-[460px] flex-col justify-start gap-y-6 rounded-lg border border-neutral-100 bg-neutral-100 p-4 text-xs font-medium shadow-md shadow-neutral-400 md:w-2/3 md:text-xl dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-black">
              <div className="flex flex-col space-y-1 border-b border-neutral-300 pb-1 tracking-wide dark:border-neutral-700/15">
                <span>Age</span>
                {calculateAge(user.birthDate)}
              </div>

              <div className="flex flex-col space-y-1 border-b border-neutral-300 pb-1 tracking-wide dark:border-neutral-700/15">
                <span>Gender</span>
                <span>{user?.gender}</span>
              </div>

              <div className="flex flex-col space-y-1 border-b border-neutral-300 pb-1 tracking-wide dark:border-neutral-700/15">
                <span>Email</span>
                <span>{user?.email}</span>
              </div>

              <div className="flex flex-col space-y-1 border-b border-neutral-300 pb-1 tracking-wide dark:border-neutral-700/15">
                <span>Phone</span>
                <span>{user?.phone}</span>
              </div>
            </ul>
          </div>

          <div className="row-span-1 flex max-h-[480px] items-center justify-start p-2 md:items-start">
            <div className="flex h-full w-full max-w-[460px] flex-col gap-y-4 rounded-lg border border-neutral-100 bg-neutral-100 p-4 text-xs font-medium shadow-md shadow-neutral-400 md:text-xl dark:border-neutral-700/15 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-black">
              <div className="flex flex-col">
                <span>Bio</span>
                <span>{user?.description}</span>
              </div>
            </div>
          </div>
        </div>
        <UserUpdateModal />
      </div>
    </UserProvider>
  );
};

export default Profile;
