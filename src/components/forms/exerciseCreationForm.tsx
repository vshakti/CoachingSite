"use client";

import React, { useState } from "react";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { ExerciseCreationFunction } from "@/lib/actions/user.actions";
import { DumbbellIcon, PlayIcon } from "lucide-react";
import SubmitButton from "@/components/submitButton";
import CustomFormField from "@/components/ui/customFormField";

import { ExerciseCreationValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";
import { ExerciseFormDefaultValues, MuscleOptions } from "@/constants";

interface ExerciseCreationFormProps {
  user: User;
}

const ExerciseCreationForm: React.FC<ExerciseCreationFormProps> = ({
  user,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ExerciseCreationValidation>>({
    resolver: zodResolver(ExerciseCreationValidation),
    defaultValues: {
      ...ExerciseFormDefaultValues,
    },
  });

  console.log(user.$id);

  async function onSubmit(values: z.infer<typeof ExerciseCreationValidation>) {
    setIsLoading(true);

    try {
      const exerciseData = {
        name: values.name,
        muscles: values.muscle,
        video: values.video,
        description: values.description,
        exerciseId: user.$id + "/" + user.exercises.length.toString(),
      };

      const userId = user.$id;

      const newUser = await ExerciseCreationFunction(exerciseData, userId!);

      const dialog = document.getElementById(
        "exercise_creation_modal",
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
          placeholder={`Exercise name`}
          iconSrc={
            <DumbbellIcon className="size-4 text-cyan-600 dark:text-neutral-200" />
          }
          control={form.control}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="video"
          label={<span className="dark:text-neutral-200">Video</span>}
          placeholder={`https://youtu.be/example`}
          iconSrc={
            <PlayIcon className="size-4 text-cyan-600 dark:text-neutral-200" />
          }
          control={form.control}
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="muscle"
            label={<span className="dark:text-neutral-200">Muscles</span>}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="grid w-96 grid-cols-3 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-200"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {MuscleOptions.map((option, i) => (
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
            label={<span className="dark:text-neutral-200">Description</span>}
            placeholder={`...`}
          />
        </div>

        <SubmitButton
          className="w-full bg-cyan-500 tracking-widest hover:bg-cyan-600"
          isLoading={isLoading}
        >
          CREATE EXERCISE
        </SubmitButton>
      </form>
    </Form>
  );
};
export default ExerciseCreationForm;
