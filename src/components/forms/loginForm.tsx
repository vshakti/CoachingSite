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

      if (user) router.push(`/user/${user.$id}/profile`);
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
          label={<span className="dark:text-neutral-200">Email</span>}
          placeholder="example@example.com"
          iconSrc={
            <AtSignIcon className="size-4 text-cyan-600 dark:text-neutral-200" />
          }
          control={form.control}
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD_INPUT}
          name="password"
          label={<span className="dark:text-neutral-200">Password</span>}
          placeholder="********"
          iconSrc={
            <LockKeyholeIcon className="size-4 text-cyan-600 dark:text-neutral-200" />
          }
          control={form.control}
        />

        <SubmitButton isLoading={isLoading}>LOG IN</SubmitButton>
      </form>
    </Form>
  );
};
export default LogInForm;
