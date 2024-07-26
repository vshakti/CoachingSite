"use client";
import Image from "next/image";

import RegisterForm from "@/components/forms/registerForm";
import { useState } from "react";
import LogInForm from "./forms/loginForm";

export default function Auth() {
  const [auth, setAuth] = useState("Register");

  return (
    <div className="flex w-3/4 flex-col items-start justify-center gap-y-2 rounded-md border border-neutral-300 p-4 shadow-md shadow-neutral-300 dark:border-neutral-700 dark:shadow-neutral-800">
      <div className="flex w-full gap-x-2 py-1">
        <button
          onClick={() => {
            setAuth("Register");
          }}
          className="w-1/2 rounded-sm bg-cyan-500 py-1 font-medium text-neutral-300 hover:bg-cyan-600"
        >
          REGISTER
        </button>
        <button
          onClick={() => {
            setAuth("Login");
          }}
          className="w-1/2 rounded-sm bg-cyan-500 py-1 font-medium text-neutral-300 hover:bg-cyan-600"
        >
          LOGIN
        </button>
      </div>

      {auth === "Register" ? <RegisterForm /> : <LogInForm />}

      <div className="text-14 flex w-full justify-between">
        <p className="justify-items-end xl:text-left dark:text-neutral-200">
          © {new Date().getFullYear()} Ignis
        </p>
      </div>
    </div>
  );
}
