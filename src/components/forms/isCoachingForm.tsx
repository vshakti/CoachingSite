"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { useState, useEffect } from "react";
import Switch from "../ui/switch";
import { CoachingStatus } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { LoaderCircleIcon } from "lucide-react";

interface UserProps {
  user: User;
}

const IsCoachingForm = ({ user }: UserProps) => {
  const [isCoaching, setIsCoaching] = useState(() => {
    const storedIsCoaching = localStorage.getItem("isCoaching");
    return storedIsCoaching ? JSON.parse(storedIsCoaching) : user.isCoaching;
  });

  const FormSchema = z.object({
    isCoaching: z.boolean(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      if (user) {
        const userData = {
          isCoaching: values.isCoaching,
          userId: user?.$id ?? "",
        };

        const newUser = await CoachingStatus(userData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    localStorage.setItem("isCoaching", JSON.stringify(isCoaching));

    const updateCoachingStatus = async () => {
      await onSubmit({ isCoaching });
    };

    updateCoachingStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCoaching]);

  return (
    <>
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row gap-x-2"
          >
            <FormField
              control={form.control}
              name="isCoaching"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-center">
                  <FormControl>
                    <Switch
                      checked={isCoaching}
                      onCheckedChange={(checked) => {
                        setIsCoaching(checked);
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <span className="flex h-full items-center justify-center text-xl font-medium text-white antialiased">
              <>
                {!isCoaching ? (
                  <span>Not coaching </span>
                ) : (
                  <span>Coaching </span>
                )}
              </>
            </span>
          </form>
        </Form>
      </>
    </>
  );
};

export default IsCoachingForm;
