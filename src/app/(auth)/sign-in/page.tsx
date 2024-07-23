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
import Image from "next/image";
import { UserFormValidation } from "@/lib/validation";

enum FormFieldType {
  INPUT = "input",
  PASSWORD_INPUT = "password",
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      const user = await LogIn(userData);

      console.log(user);

      if (user) router.push(`/user`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="remove-scrollbar flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="h-72 w-72 items-center justify-center md:h-96 md:w-96">
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label={<span className="dark:text-neutral-200">Email</span>}
              placeholder="johdoe@gmail.com"
              iconSrc={
                <AtSignIcon className="text-cyan-600 dark:text-neutral-200" />
              }
              control={form.control}
            />

            <CustomFormField
              fieldType={FormFieldType.PASSWORD_INPUT}
              name="password"
              label={<span className="dark:text-neutral-200">Password</span>}
              placeholder="********"
              iconSrc={
                <LockKeyholeIcon className="text-cyan-600 dark:text-neutral-200" />
              }
              control={form.control}
            />

            <SubmitButton isLoading={isLoading}>LOG IN</SubmitButton>
          </form>
        </Form>
        <p className="mt-4 flex w-full items-center justify-center xl:text-left dark:text-neutral-200">
          © {new Date().getFullYear()} Ignis
        </p>
      </div>
    </div>
  );
};
export default SignIn;
