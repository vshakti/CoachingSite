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
import { getLoggedInUser, Register } from "@/lib/actions/user.actions";
import { FormFieldType, ShowToastParams } from "@/lib/exports/exports";
import { useLoggedUser } from "@/lib/context/loggedUser";
import Toast from "../ui/toast";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setLoggedUser } = useLoggedUser();
  const [toast, setToast] = useState<{
    message: React.ReactNode;
    type: string;
    show: boolean;
  }>({
    message: "",
    type: "",
    show: false,
  });
  const showToast = ({ message, type = "info" }: ShowToastParams) => {
    setToast({ message, type, show: true });
  };

  const handleToastClose = () => {
    setToast({ ...toast, show: false });
  };

  const form = useForm<z.infer<typeof UserAuthValidation>>({
    resolver: zodResolver(UserAuthValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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

      if (user) {
        showToast({
          message: (
            <span className="flex w-max items-center justify-center px-4 py-2 text-center text-white">
              Your account was created. Check your email to verify it.
            </span>
          ),
          type: "info",
        });
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
        <CustomFormField
          fieldType={FormFieldType.PASSWORD_INPUT}
          name="confirmPassword"
          label={<span className="text-white">Confirm Password</span>}
          placeholder="********"
          iconSrc={<LockKeyholeIcon className="size-4 text-white" />}
          control={form.control}
        />

        <SubmitButton
          className="w-full border border-slate-700 bg-black text-xl tracking-wider hover:border-cyan-500 hover:bg-black hover:text-cyan-500"
          isLoading={isLoading}
        >
          GET STARTED FOR FREE
        </SubmitButton>
        {toast.show && (
          <Toast
            message={toast.message}
            type={
              toast.type as "info" | "success" | "error" | "warning" | "action"
            }
            onClose={handleToastClose}
          />
        )}
      </form>
    </Form>
  );
};

export default RegisterForm;
