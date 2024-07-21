import Link from "next/link";
import Image from "next/image";

const Navbar = async () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b bg-white/75 backdrop-blur-lg transition-all dark:bg-neutral-900">
      <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-400">
        <Link href="/" className="z-40 flex items-center gap-x-2 font-semibold">
          <Image
            src="/logo/logo.png"
            width={26}
            height={26}
            quality={100}
            alt="logo"
          />
          <span className="text-xl font-bold tracking-widest text-cyan-500 dark:text-white">
            ignis
          </span>
        </Link>

        <div className="flex h-full items-center space-x-3">
          <Link
            href={"/user/control-panel"}
            className="rounded-md px-1.5 py-0.5 hover:bg-neutral-200 hover:font-medium dark:text-neutral-300 dark:hover:bg-neutral-950"
          >
            Control Panel
          </Link>

          <Link
            href={"/api/auth/logout"}
            className="rounded-md px-1.5 py-0.5 hover:bg-neutral-200 hover:font-medium dark:text-neutral-300 dark:hover:bg-neutral-950"
          >
            Log in
          </Link>

          <div className="hidden h-8 w-px bg-neutral-200 sm:block dark:bg-slate-400" />

          <Link
            href={"/donation"}
            className="rounded-md bg-cyan-400/75 px-5 py-2 font-medium text-white hover:bg-cyan-400 dark:bg-cyan-500/90 dark:text-neutral-200 dark:hover:bg-cyan-500/80"
          >
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
