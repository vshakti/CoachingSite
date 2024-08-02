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

const IsCoachingForm = () => {
  const [isCoaching, setIsCoaching] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
    const fetchUser = async () => {
      try {
        const newUser = await getLoggedInUser();
        setUser(newUser);
        if (newUser) {
          setIsCoaching(newUser.isCoaching);
          form.setValue("isCoaching", newUser.isCoaching);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const updateCoachingStatus = async () => {
      await onSubmit({ isCoaching });
    };

    updateCoachingStatus();
  }, [isCoaching]);

  return (
    <>
      {!user ? (
        <div className="flex flex-row gap-x-2">
          <div className="flex h-5 w-12 items-center rounded-full bg-neutral-500 px-1">
            <div className="size-4 rounded-full bg-neutral-400"></div>
          </div>
          <LoaderCircleIcon className="size-5 animate-spin text-neutral-300" />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default IsCoachingForm;
