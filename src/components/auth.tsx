import Image from "next/image";
import Link from "next/link";
import UserForm from "@/components/forms/userForm";

export default function Auth() {
  return (
    <div className="flex w-3/4 flex-col items-start justify-center gap-y-2 p-4">
      <div className="flex w-full flex-row items-center justify-center gap-x-1">
        <Image
          src="/logo/logo.png"
          alt="logo"
          width={30}
          height={30}
          quality={100}
        />
        <h1 className="text-5xl font-medium tracking-wide text-cyan-500 dark:text-neutral-200">
          Ignis
        </h1>
      </div>

      <UserForm />

      <div className="text-14 flex w-full justify-between">
        <p className="justify-items-end xl:text-left dark:text-neutral-200">
          © {new Date().getFullYear()} Ignis
        </p>
        <span className="text-cyan-500">
          Got an account already?{" "}
          <Link
            href="/sign-in"
            className="rounded-sm bg-cyan-600 px-4 py-1 text-neutral-200 hover:bg-cyan-700"
          >
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}
