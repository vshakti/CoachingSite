"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import CustomFormField from "../ui/customFormField";
import { AtSignIcon, LockKeyholeIcon, UserIcon } from "lucide-react";
import SubmitButton from "../submitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Register } from "@/lib/actions/user.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  PASSWORD_INPUT = "password",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const UserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      const user = await Register(userData);

      if (user) router.push(`/lol`);
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

        {/* <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label={<span className="dark:text-neutral-200">Phone number</span>}
          placeholder="(555) 123-4567"
          control={form.control}
        /> */}
        <SubmitButton isLoading={isLoading}>REGISTER FOR FREE</SubmitButton>
      </form>
    </Form>
  );
};

export default UserForm;
