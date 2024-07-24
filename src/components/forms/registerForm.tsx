"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import CustomFormField from "../ui/customFormField";
import { AtSignIcon, LockKeyholeIcon, UserIcon } from "lucide-react";
import SubmitButton from "../submitButton";
import { useState } from "react";
import { UserAuthValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Register } from "@/lib/actions/user.actions";
import { FormFieldType } from "@/lib/exports/exports";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      const user = await Register(userData);

      if (user) router.push(`/user/${user.$id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label={<span className="dark:text-neutral-200">Email</span>}
          placeholder="johdoe@gmail.com"
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

        <SubmitButton isLoading={isLoading}>REGISTER FOR FREE</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
