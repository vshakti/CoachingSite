import React, { forwardRef, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "@/components/ui/customFormField";
import { useRouter } from "next/navigation";
import {
  ExerciseProgressionUpdate,
  getLoggedInUser,
} from "@/lib/actions/user.actions";
import { ExerciseProgressionValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";
import SubmitButton from "../submitButton";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useLoggedUser } from "@/lib/context/loggedUser";

interface ExerciseCompletionProps {
  user: User;
  exerciseName: string;
  exerciseId: string;
  onReset: () => void;
}

const CompleteExerciseForm = forwardRef<
  HTMLFormElement,
  ExerciseCompletionProps
>(
  (
    { user, exerciseName, exerciseId, onReset }: ExerciseCompletionProps,
    ref,
  ) => {
    const [sets, setSets] = useState([{ id: Date.now() }]);
    const [isLoading, setIsLoading] = useState(false);
    const { setLoggedUser } = useLoggedUser();

    const addSet = () => {
      setSets([...sets, { id: Date.now() }]);
    };

    const removeSet = (id: number) => {
      setSets(sets.filter((set) => set.id !== id));
    };

    const form = useForm<z.infer<typeof ExerciseProgressionValidation>>({
      resolver: zodResolver(ExerciseProgressionValidation),
      defaultValues: {
        sets: [1],
        reps: [1],
        rpe: [1],
        feedback: "",
      },
    });

    const { control, handleSubmit, reset } = form;

    const formatDateToDDMMYYYYHHMMSSMS = (date: any) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds},${milliseconds}`;
    };

    const handleClose = () => {
      setSets([{ id: Date.now() }]);
      reset();
      onReset();
    };

    const onSubmit = async (
      values: z.infer<typeof ExerciseProgressionValidation>,
    ) => {
      setIsLoading(true);

      try {
        const date = new Date();
        const formattedDate = formatDateToDDMMYYYYHHMMSSMS(date);

        const progressionData = {
          sets: sets.length,
          reps: values.reps,
          rpe: values.rpe,
          weight: values.weight,
          feedback: values.feedback,
          trainingDay: formattedDate,
        };
        const userId = user.$id;

        await ExerciseProgressionUpdate(
          progressionData,
          userId!,
          exerciseName,
          exerciseId,
        );
        const newUser = await getLoggedInUser();
        setLoggedUser(newUser);
        const dialog = document.getElementById(
          "finish_exercise_modal",
        ) as HTMLDialogElement;

        handleClose();
        if (dialog) {
          dialog.close();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleClose}
          className="w-full space-y-6"
        >
          <div className="flex flex-col gap-6 text-xl text-white antialiased">
            <div className="flex flex-col">
              <div className="flex w-[440px] flex-col items-center justify-center gap-y-4 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0 p-3">
                <div className="relative flex w-full flex-row items-center justify-evenly">
                  <button
                    type="button"
                    className="absolute left-0"
                    onClick={addSet}
                  >
                    <PlusIcon className="size-5 text-cyan-500" />
                  </button>
                  <span className="flex w-1/3 items-center justify-center">
                    Set
                  </span>
                  <span className="flex w-1/3 items-center justify-center">
                    Reps
                  </span>
                  <span className="flex w-1/3 items-center justify-center">
                    RPE
                  </span>
                  <span className="flex w-1/3 items-center justify-center">
                    Weight
                  </span>
                </div>
                {sets.map((set, index) => (
                  <div
                    key={set.id}
                    className="relative flex w-full flex-row items-center justify-evenly text-sm"
                  >
                    <button
                      type="button"
                      className="absolute left-0"
                      onClick={() => removeSet(set.id)}
                    >
                      <MinusIcon className="size-5 text-cyan-500" />
                    </button>
                    <span className="flex w-1/3 items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="flex w-1/3 items-center justify-center">
                      <Controller
                        name={`reps.${index}`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="number"
                            {...field}
                            className="w-14 rounded-md bg-black/50 pl-3"
                            placeholder={``}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            value={field.value || ""}
                          />
                        )}
                      />
                    </span>
                    <span className="flex w-1/3 items-center justify-center">
                      <Controller
                        name={`rpe.${index}`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="number"
                            {...field}
                            className="w-14 rounded-md bg-black/50 pl-3"
                            placeholder={``}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            value={field.value || ""}
                          />
                        )}
                      />
                    </span>
                    <span className="flex w-1/3 items-center justify-center">
                      <Controller
                        name={`weight.${index}`}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="number"
                            {...field}
                            className="w-14 rounded-md bg-black/50 pl-3"
                            placeholder={``}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            value={field.value || ""}
                          />
                        )}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="feedback"
                label={<span className="text-white">Feedback</span>}
                placeholder={`...`}
                className="border-0 bg-gradient-to-r from-zinc-950/0 via-zinc-950 to-zinc-950/0"
              />
            </div>
          </div>
          {sets.length > 0 ? (
            <SubmitButton
              isLoading={isLoading}
              className="w-full border border-slate-700 bg-slate-950 tracking-widest text-white hover:border-cyan-500 hover:bg-slate-950 hover:text-cyan-500"
            >
              <span>FINISH</span>
            </SubmitButton>
          ) : (
            <></>
          )}
        </form>
      </Form>
    );
  },
);

CompleteExerciseForm.displayName = "CompleteExerciseForm";
export default CompleteExerciseForm;
