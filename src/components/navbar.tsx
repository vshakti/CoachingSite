import Link from "next/link";
import Image from "next/image";

const Navbar = async () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all dark:border-zinc-950 dark:bg-zinc-900">
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-950">
        <Link href="/" className="z-40 flex items-center gap-x-2 font-semibold">
          <Image
            src="/logo/logo.png"
            width={26}
            height={26}
            quality={100}
            alt="logo"
          />
          <span className="text-xl tracking-widest text-sky-600 dark:text-sky-500">
            IGNIS
          </span>
        </Link>

        <div className="flex h-full items-center space-x-3">
          <Link
            href={"/user/control-panel"}
            className="rounded-md px-1.5 py-0.5 hover:bg-zinc-200 hover:font-medium dark:text-zinc-300 dark:hover:bg-zinc-950"
          >
            Control Panel
          </Link>

          <Link
            href={"/api/auth/logout"}
            className="rounded-md px-1.5 py-0.5 hover:bg-zinc-200 hover:font-medium dark:text-zinc-300 dark:hover:bg-zinc-950"
          >
            Log in
          </Link>

          <div className="hidden h-8 w-px bg-zinc-200 sm:block dark:bg-slate-400" />

          <Link
            href={"/donation"}
            className="rounded-lg bg-sky-500/75 px-2 py-1 font-medium text-white hover:bg-sky-500 dark:bg-sky-600/90 dark:text-zinc-200 dark:hover:bg-sky-600/80"
          >
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
