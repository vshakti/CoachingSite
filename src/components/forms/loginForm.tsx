"use client";

import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { LogIn } from "@/lib/actions/user.actions";
import { AtSignIcon, LockKeyholeIcon } from "lucide-react";
import SubmitButton from "@/components/submitButton";
import CustomFormField from "@/components/ui/customFormField";
import { UserAuthValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";

const LogInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

      if (user) router.push(`/user/profile`);
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
          className="w-full border border-slate-700 bg-black text-xl tracking-wider hover:border-yellow-400 hover:bg-black hover:text-yellow-400"
          isLoading={isLoading}
        >
          LOG IN
        </SubmitButton>
      </form>
    </Form>
  );
};
export default LogInForm;
