"use client";

import RegisterForm from "@/components/forms/registerForm";
import { useState } from "react";
import LogInForm from "./forms/loginForm";

export default function Auth() {
  const [auth, setAuth] = useState("Register");

  return (
    <div className="flex w-3/4 flex-col items-start justify-center gap-y-2 rounded-md border border-neutral-300 p-4 shadow-md shadow-neutral-300 dark:border-neutral-700 dark:shadow-neutral-800">
      <div className="flex w-full gap-x-2 rounded-lg">
        <button
          disabled={auth === "Register"}
          onClick={() => {
            setAuth("Register");
          }}
          className={`${auth === "Login" ? "bg-cyan-500 hover:bg-cyan-600" : "bg-neutral-200 dark:bg-neutral-800"} w-1/2 rounded-sm py-1 font-medium text-neutral-300`}
        >
          REGISTER
        </button>
        <button
          disabled={auth === "Login"}
          onClick={() => {
            setAuth("Login");
          }}
          className={`${auth === "Register" ? "bg-cyan-500 hover:bg-cyan-600" : "bg-neutral-200 dark:bg-neutral-800"} w-1/2 rounded-sm py-1 font-medium text-neutral-300`}
        >
          LOG IN
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
