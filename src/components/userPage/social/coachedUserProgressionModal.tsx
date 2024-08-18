import { XIcon } from "lucide-react";
import { Progress } from "../progress/progress";
import ClientsPicture from "../profile/clientsPic";

interface CoachedUserProgressionModal {
  user: User;
  userImages: { [key: string]: string };
}

const CoachedUserProgressionModal = ({ user }: UserProps) => {
  return (
    <dialog id="coached_user_progression_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 px-4 backdrop-blur-sm">
        <div className="flex w-max flex-col items-center justify-center gap-y-2 rounded-md border border-slate-600 bg-gradient-to-b from-slate-950 via-violet-950 to-slate-950 p-4">
          <div className="flex w-full flex-row items-center justify-between text-white">
            <h2 className="w-max text-xl font-medium md:text-3xl">
              {user ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <ClientsPicture user={user} />
                  {user.name ? <>{user.name}</> : <>{user.email}</>}
                </div>
              ) : (
                <></>
              )}
            </h2>
            <form method="dialog">
              <button className="flex items-center justify-center">
                <XIcon className="md:size-10" />
              </button>
            </form>
          </div>
          <div className="">
            <Progress
              user={user}
              className="remove-scrollbar grid h-96 gap-3 overflow-auto p-3 text-white antialiased lg:ml-6 lg:h-max lg:grid-cols-6 lg:grid-rows-6"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CoachedUserProgressionModal;
