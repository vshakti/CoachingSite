"use client";

import React, { useState } from "react";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import { useRouter } from "next/navigation";
import { UpdateUser } from "@/lib/actions/user.actions";
import { AtSignIcon, UserRoundIcon } from "lucide-react";
import SubmitButton from "@/components/submitButton";
import CustomFormField from "@/components/ui/customFormField";
import { UserFormValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";
import { GenderOptions } from "@/constants";

interface UserProps {
  user: User;
}

const UserForm = ({ user }: UserProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const defaultValues = {
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    birthDate: user?.birthDate ?? new Date(Date.now()),
    gender: user?.gender ?? "Male",
    description: user?.description ?? "",
  };

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      ...defaultValues,
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        userId: user?.$id ?? "",
        name: values.name,
        phone: values.phone ?? "",
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        description: values.description,
      };
      const newUser = await UpdateUser(userData);

      const dialog = document.getElementById(
        "user_update_modal",
      ) as HTMLDialogElement;
      router.refresh();
      if (dialog) {
        dialog.close();
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
          name="name"
          label={<span className="dark:text-neutral-200">Name</span>}
          placeholder={`${user?.name ? `${user.name}` : "Example"}`}
          iconSrc={
            <UserRoundIcon className="size-4 text-cyan-600 dark:text-neutral-200" />
          }
          control={form.control}
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label={<span className="dark:text-neutral-200">Phone number</span>}
            placeholder={`${user?.phone ? `${user.phone}` : "(55) 123 4567"}`}
            control={form.control}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            iconSrc={
              <AtSignIcon className="size-4 text-cyan-600 dark:text-neutral-200" />
            }
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label={<span className="dark:text-neutral-200">Birth Date</span>}
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label={<span className="dark:text-neutral-200">Gender</span>}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-8 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-200"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="description"
            label={<span className="dark:text-neutral-200">Bio</span>}
            placeholder={`${user?.description ? `${user.description}` : "..."}`}
          />
        </div>

        <SubmitButton
          className="w-full bg-cyan-500 tracking-widest hover:bg-cyan-600"
          isLoading={isLoading}
        >
          UPDATE PROFILE
        </SubmitButton>
      </form>
    </Form>
  );
};
export default UserForm;
