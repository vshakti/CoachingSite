"use client";

import RegisterForm from "@/components/forms/registerForm";
import { useState } from "react";
import LogInForm from "./forms/loginForm";
import { XIcon } from "lucide-react";

export default function Auth() {
  const [auth, setAuth] = useState("Register");

  return (
    <dialog id="auth_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="flex w-3/4 flex-col items-start justify-center gap-y-3 rounded-md border border-slate-700 bg-gradient-to-tr from-black via-zinc-950 to-black p-2">
          <div className="flex w-full items-center justify-center gap-x-2 rounded-lg">
            <button
              disabled={auth === "Register"}
              onClick={() => {
                setAuth("Register");
              }}
              className={`${auth === "Login" ? "border border-slate-700 bg-black hover:border hover:border-cyan-500 hover:text-cyan-500" : "bg-transparent text-cyan-500"} w-1/2 rounded-sm py-1 font-medium text-white`}
            >
              REGISTER
            </button>
            <button
              disabled={auth === "Login"}
              onClick={() => {
                setAuth("Login");
              }}
              className={`${auth === "Register" ? "border border-slate-700 bg-black hover:border hover:border-cyan-500 hover:text-cyan-500" : "bg-transparent text-cyan-500"} w-1/2 rounded-sm py-1 font-medium text-white`}
            >
              LOG IN
            </button>
            <form method="dialog">
              <button className="flex items-center justify-center">
                <XIcon className="text-white" />
              </button>
            </form>
          </div>

          {auth === "Register" ? <RegisterForm /> : <LogInForm />}

          <div className="text-14 flex w-full flex-row text-white">
            <div className="flex items-center justify-between gap-x-3">
              <p className="flex items-center justify-center xl:text-left">
                © {new Date().getFullYear()}
              </p>
              <span className="flex items-center justify-center font-astro text-xs">
                Nebula
              </span>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
