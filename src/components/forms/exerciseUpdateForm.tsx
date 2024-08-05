"use client";

import React, { useState } from "react";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSwitchGroup from "../ui/customSwitch";

import { useRouter } from "next/navigation";
import { UpdateExercise } from "@/lib/actions/user.actions";
import { DumbbellIcon, PlayIcon } from "lucide-react";
import SubmitButton from "@/components/submitButton";
import CustomFormField from "@/components/ui/customFormField";

import { ExerciseCreationValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";
import { MuscleOptions } from "@/constants";

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
      muscles: exercise?.muscles,
    },
  });

  async function onSubmit(values: z.infer<typeof ExerciseCreationValidation>) {
    setIsLoading(true);
    if (exercise) {
      try {
        const exerciseData = {
          name: values.name,
          muscles: values.muscles,
          video: values.video ? new URL(values.video) : undefined,
          description: values.description,
          exerciseId: exercise.$id,
        };

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
          label={<span className="text-white">Name</span>}
          placeholder={`${exercise?.name ? `${exercise?.name}` : "Exercise name"}`}
          iconSrc={<DumbbellIcon className="size-4 text-white" />}
          control={form.control}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="video"
          label={<span className="text-white">Video</span>}
          placeholder={`${exercise?.video ? `${exercise?.video}` : "https://youtu.be/example"}`}
          iconSrc={<PlayIcon className="size-4 text-white" />}
          control={form.control}
        />

        <div className="flex w-full flex-col gap-6">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="muscles"
            label={<span className="text-white">Muscles</span>}
            renderSkeleton={() => (
              <CustomSwitchGroup
                name="muscles"
                options={MuscleOptions}
                control={form.control}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="description"
            label={<span className="text-white">Description</span>}
            placeholder={`${exercise?.description ? `${exercise?.description}` : "..."}`}
          />
        </div>

        <SubmitButton
          className="w-full border border-slate-700 bg-slate-950 tracking-widest text-white hover:border-yellow-400 hover:bg-slate-950 hover:text-yellow-400"
          isLoading={isLoading}
        >
          UPDATE {exercise?.name.toUpperCase()}
        </SubmitButton>
      </form>
    </Form>
  );
};
export default ExerciseUpdateForm;
