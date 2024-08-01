"use client";

import React, { useState } from "react";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import {
  ExerciseCreationFunction,
  UpdateExercise,
} from "@/lib/actions/user.actions";
import { DumbbellIcon, PlayIcon } from "lucide-react";
import SubmitButton from "@/components/submitButton";
import CustomFormField from "@/components/ui/customFormField";

import { ExerciseCreationValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";
import { ExerciseFormDefaultValues, MuscleOptions } from "@/constants";

interface ExerciseUpdateFormProps {
  exercise: Exercise | undefined;
}

const ExerciseUpdateForm: React.FC<ExerciseUpdateFormProps> = ({
  exercise,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ExerciseCreationValidation>>({
    resolver: zodResolver(ExerciseCreationValidation),
    defaultValues: {
      name: exercise?.name,
      description: exercise?.description,
      video: exercise?.video?.toString(),
      muscle: exercise?.muscles,
    },
  });

  async function onSubmit(values: z.infer<typeof ExerciseCreationValidation>) {
    setIsLoading(true);
    if (exercise) {
      try {
        const exerciseData = {
          name: values.name,
          muscles: values.muscle,
          video: values.video ? new URL(values.video) : undefined,
          description: values.description,
          exerciseId: exercise.$id,
        };

        console.log(exerciseData);

        const updateExercise = await UpdateExercise(exerciseData);

        const dialog = document.getElementById(
          "exercise_update_modal",
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="name"
          label={<span className="dark:text-neutral-200">Name</span>}
          placeholder={`${exercise?.name ? `${exercise?.name}` : "Exercise name"}`}
          iconSrc={
            <DumbbellIcon className="size-4 text-cyan-600 dark:text-neutral-200" />
          }
          control={form.control}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="video"
          label={<span className="dark:text-neutral-200">Video</span>}
          placeholder={`${exercise?.video ? `${exercise?.video}` : "https://youtu.be/example"}`}
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
                  value={exercise?.muscles}
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
            placeholder={`${exercise?.description ? `${exercise?.description}` : "..."}`}
          />
        </div>

        <SubmitButton
          className="w-full bg-cyan-500 tracking-widest hover:bg-cyan-600"
          isLoading={isLoading}
        >
          UPDATE {exercise?.name.toUpperCase()}
        </SubmitButton>
      </form>
    </Form>
  );
};
export default ExerciseUpdateForm;
