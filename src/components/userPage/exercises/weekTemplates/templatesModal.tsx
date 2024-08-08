"use client";

import { XIcon } from "lucide-react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import TemplateNavbar from "./templateNavbar";
import TemplateTypeTitle from "./templateTypeTitle";
import TemplateCards from "./templateCards";

interface UserProps {
  user: User;
}

const TemplatesModal = ({ user }: UserProps) => {
  return (
    <dialog id="templates_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="flex h-5/6 w-5/6 flex-col gap-y-4 rounded-md border border-slate-700 bg-gradient-to-b from-slate-950 via-violet-950 to-slate-950 pt-4">
          <div className="flex w-full flex-row items-center justify-between px-6 text-white">
            <h2 className="w-max text-xl font-medium md:text-3xl">
              TRAINING DAYS
            </h2>
            <form method="dialog">
              <button className="flex items-center justify-center">
                <XIcon className="md:size-10" />
              </button>
            </form>
          </div>
          <div className="flex h-full border-spacing-4 flex-row overflow-hidden overscroll-contain">
            <div className="remove-scrollbar flex h-full w-full flex-col overflow-auto">
              <TemplateTypeTitle />
              <div className="flex h-full w-full flex-row">
                <div className="w-32 py-6">
                  <TemplateNavbar user={user} />
                </div>
                <div className="remove-scrollbar grid h-max grid-cols-1 gap-4 overflow-auto p-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  <TemplateCards user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default TemplatesModal;
