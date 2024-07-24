"use client";
import Image from "next/image";

import RegisterForm from "@/components/forms/registerForm";
import { useState } from "react";
import LogInForm from "./forms/loginForm";

export default function Auth() {
  const [auth, setAuth] = useState("Register");

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

      {auth === "Register" ? <RegisterForm /> : <LogInForm />}

      <div className="text-14 flex w-full justify-between">
        <p className="justify-items-end xl:text-left dark:text-neutral-200">
          © {new Date().getFullYear()} Ignis
        </p>

        {auth === "Register" ? (
          <div className="flex gap-x-2">
            <span className="dark:text-neutral-200">
              Got an account already?{" "}
            </span>
            <button
              onClick={() => {
                setAuth("Login");
              }}
              className="text-cyan-500"
            >
              Log in
            </button>
          </div>
        ) : (
          <div className="flex gap-x-2">
            <span className="dark:text-neutral-200">
              Do not have an account?{" "}
            </span>
            <button
              onClick={() => {
                setAuth("Register");
              }}
              className="text-cyan-500"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
