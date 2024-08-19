"use client";

import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { getLoggedInUser, LogIn } from "@/lib/actions/user.actions";
import { AtSignIcon, LockKeyholeIcon } from "lucide-react";
import SubmitButton from "@/components/submitButton";
import CustomFormField from "@/components/ui/customFormField";
import { UserAuthValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";
import { useLoggedUser } from "@/lib/context/loggedUser";

const LogInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setLoggedUser } = useLoggedUser();

  const form = useForm<z.infer<typeof UserAuthValidation>>({
    resolver: zodResolver(UserAuthValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserAuthValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      const user = await LogIn(userData);

      if (user) {
        const loggedUser = await getLoggedInUser();
        setLoggedUser(loggedUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label={<span className="text-white">Email</span>}
          placeholder="example@example.com"
          iconSrc={<AtSignIcon className="size-4 text-white" />}
          control={form.control}
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD_INPUT}
          name="password"
          label={<span className="text-white">Password</span>}
          placeholder="********"
          iconSrc={<LockKeyholeIcon className="size-4 text-white" />}
          control={form.control}
        />

        <SubmitButton
          className="w-full border border-slate-700 bg-black text-xl tracking-wider hover:border-cyan-500 hover:bg-black hover:text-cyan-500"
          isLoading={isLoading}
        >
          LOG IN
        </SubmitButton>
      </form>
    </Form>
  );
};
export default LogInForm;
