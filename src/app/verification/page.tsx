"use client";

import Toast from "@/components/ui/toast";
import { getLoggedInUser, VerifyUser } from "@/lib/actions/user.actions";
import { useLoggedUser } from "@/lib/context/loggedUser";
import { ShowToastParams } from "@/lib/exports/exports";
import { BadgeCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Client, Account } from "node-appwrite";
import { useState } from "react";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const UserVerification = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: React.ReactNode;
    type: string;
    show: boolean;
  }>({
    message: "",
    type: "",
    show: false,
  });
  const showToast = ({ message, type = "info" }: ShowToastParams) => {
    setToast({ message, type, show: true });
  };

  const handleToastClose = () => {
    setToast({ ...toast, show: false });
  };

  if (loggedUser && loggedUser.verified === true) {
    router.push("/");
  }

  console.log(loggedUser);

  async function verifyUser() {
    try {
      setIsLoading(true);

      const account = new Account(client);

      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get("secret");
      const userId = urlParams.get("userId");

      const verify = account.updateVerification(userId!, secret!);

      const updateUser = await VerifyUser(loggedUser?.$id!, true);

      const newUser = await getLoggedInUser();
      setLoggedUser(newUser);

      verify.then(
        function (response) {
          showToast({
            message: (
              <span className="flex w-max items-center justify-center px-4 py-2 text-center text-white">
                Your account was verified.
              </span>
            ),
            type: "info",
          });
        },
        function (error) {
          console.log(error);
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center py-64 text-6xl tracking-wide text-white antialiased">
      <button
        className="flex w-max flex-row items-center justify-center gap-2 bg-gradient-to-r from-transparent via-violet-950 to-transparent px-12"
        onClick={verifyUser}
      >
        <BadgeCheckIcon
          className={`${isLoading ? "animate-pulse" : ""} size-16`}
        />{" "}
        <span className={`${isLoading ? "animate-pulse" : ""}`}>VERIFY</span>
      </button>
      {toast.show && (
        <Toast
          message={toast.message}
          type={
            toast.type as "info" | "success" | "error" | "warning" | "action"
          }
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};
export default UserVerification;
