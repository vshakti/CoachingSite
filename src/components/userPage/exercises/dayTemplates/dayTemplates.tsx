"use client";

import {
  CalendarPlusIcon,
  CheckIcon,
  ChevronsRightIcon,
  EraserIcon,
  LockIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import CustomFormField from "@/components/ui/customFormField";

import Toast from "@/components/ui/toast";

import { TemplateDayCreationValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateDayDefaultValues } from "@/constants";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/submitButton";
import { TemplateDayCreation } from "@/lib/actions/user.actions";
import { useExerciseContext } from "@/lib/context/exerciseAdd";

interface UserProps {
  user: User;
}

interface ShowToastParams {
  message: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "action";
}

const DayTemplates = ({ user }: UserProps) => {
  const [dayTemplateIsOpen, setDayTemplateIsOpen] = useState(true);
  const {
    exerciseList,
    setExerciseList,
    templateDay,
    setTemplateDay,
    isAdding,
    setIsAdding,
  } = useExerciseContext();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof TemplateDayCreationValidation>>({
    resolver: zodResolver(TemplateDayCreationValidation),
    defaultValues: {
      ...TemplateDayDefaultValues,
    },
  });

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

  async function onSubmit(
    values: z.infer<typeof TemplateDayCreationValidation>,
  ) {
    setIsLoading(true);

    try {
      const templateData = {
        name: values.name,
        type: values.type,
        description: values.description,
        exerciseSpecifics: templateDay.exerciseSpecifics,
        creator: user.email,
      };

      const userId = user.$id;

      const dayTemplate = await TemplateDayCreation(templateData, userId!);

      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setExerciseList([]);
      setTemplateDay({
        ...templateDay,
        exerciseSpecifics: [],
      });
      showToast({
        message: <span>Training card created!</span>,
        type: "success",
      });
    }
  }

  return (
    <>
      <div
        className={`${!dayTemplateIsOpen ? "" : "hidden"} flex flex-col items-center justify-center gap-y-2`}
      >
        <button
          onClick={() => {
            setDayTemplateIsOpen(!dayTemplateIsOpen);
          }}
        >
          <CalendarPlusIcon className="size-12 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-2 text-white" />
        </button>
        <h1 className="text-lg font-medium tracking-wide text-white antialiased">
          CREATE YOUR TRAINIG DAYS
        </h1>
      </div>

      <div
        className={`${dayTemplateIsOpen ? "flex h-max w-full flex-col px-1 text-white" : "hidden"} max-h-[640px] max-w-[440px] transition-transform duration-500 md:max-w-[580px]`}
      >
        <div className="relative flex h-[560px] flex-col items-center justify-center gap-y-2 rounded-lg border bg-gradient-to-br from-zinc-950 to-neutral-950 p-4">
          <div className="flex w-full flex-row items-center justify-between pr-2">
            <div className="flex gap-x-4">
              <button
                disabled={isAdding}
                onClick={() => {
                  setIsAdding(!isAdding);
                }}
              >
                <ChevronsRightIcon
                  className={`${!isAdding ? "opacity-30" : ""} flex size-9 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-2 text-white`}
                />
              </button>

              <button
                disabled={!isAdding}
                onClick={() => {
                  setIsAdding(!isAdding);
                }}
              >
                <LockIcon
                  className={`${isAdding ? "opacity-30" : ""} flex size-9 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-2 text-white`}
                />
              </button>

              <button
                disabled={exerciseList.length === 0}
                onClick={() => {
                  setExerciseList([]);
                  setTemplateDay({
                    ...templateDay,
                    exerciseSpecifics: [],
                  });
                }}
              >
                <EraserIcon
                  className={`${exerciseList.length === 0 ? "opacity-30" : ""} flex size-9 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-2 text-white`}
                />
              </button>
            </div>
            <button
              onClick={() => {
                setDayTemplateIsOpen(!dayTemplateIsOpen);
              }}
            >
              <CalendarPlusIcon className="flex size-9 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-2 text-white" />
            </button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full w-full"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-xl px-3 py-1">
                <h3 className="flex h-10 w-full items-center justify-between rounded-full border border-slate-700 bg-zinc-950 px-2 pb-2 ring-yellow-500 ring-offset-0 group-focus-within:ring-1">
                  <div className="mt-3 flex w-3/4 flex-row items-end justify-end">
                    <CustomFormField
                      fieldType={FormFieldType.TEMPLATE_DAY}
                      name="name"
                      label={<span className="hidden text-white"></span>}
                      placeholder={`Training day name`}
                      iconSrc={<></>}
                      control={form.control}
                    />
                  </div>
                  <div className="mt-3 flex h-full w-1/3 items-center justify-center">
                    <CustomFormField
                      fieldType={FormFieldType.TEMPLATE_DAY}
                      name="type"
                      label={<span className="hidden text-white"></span>}
                      placeholder={`Type of day`}
                      iconSrc={<></>}
                      control={form.control}
                    />
                  </div>
                </h3>
                <ul className="h-2/3 w-full">
                  <>
                    <div className="remove-scrollbar flex h-80 w-full flex-col overflow-auto">
                      <>
                        {exerciseList.length > 0 ? (
                          exerciseList.map((exercises, i) => (
                            <div key={i} className="px-3 py-1">
                              <div className="flex flex-row items-center justify-center">
                                <CustomFormField
                                  fieldType={FormFieldType.SKELETON}
                                  control={form.control}
                                  name={`exerciseSpecifics.${i}.exercise`}
                                  label={
                                    <span className="hidden text-white"></span>
                                  }
                                  renderSkeleton={() => (
                                    <div className="flex flex-row items-center justify-center gap-x-3 rounded-full border border-yellow-400 bg-gradient-to-r from-gray-900 via-violet-950 to-gray-900 px-4 py-1 text-white shadow-sm shadow-black">
                                      <div className="flex w-40 flex-shrink-0 flex-row items-end justify-start gap-x-1 md:w-64 md:gap-x-3">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setExerciseList((prevList) =>
                                              prevList.filter(
                                                (item) =>
                                                  item.$id !== exercises.$id,
                                              ),
                                            );
                                            const updatedExerciseSpecifics =
                                              templateDay.exerciseSpecifics!.filter(
                                                (item) =>
                                                  item.exercises.$id !==
                                                  exercises.$id,
                                              );

                                            setTemplateDay((prevDay) => ({
                                              ...prevDay,
                                              exerciseSpecifics:
                                                updatedExerciseSpecifics,
                                            }));
                                          }}
                                        >
                                          <XIcon />
                                        </button>
                                        <div className="w-full items-center justify-start truncate">
                                          {exercises.name}
                                        </div>
                                      </div>

                                      <div className="flex items-end justify-evenly gap-x-3 p-1">
                                        <div className="flex h-max w-max items-center justify-center text-white">
                                          <input
                                            id="inputField"
                                            type="text"
                                            onChange={(e) => {
                                              const newTargetSets =
                                                e.target.value;

                                              setTemplateDay((prevDay) => ({
                                                ...prevDay,
                                                exerciseSpecifics:
                                                  prevDay.exerciseSpecifics!.map(
                                                    (item, index) =>
                                                      index === i
                                                        ? {
                                                            ...item,
                                                            targetSets:
                                                              newTargetSets,
                                                          }
                                                        : item,
                                                  ),
                                              }));
                                            }}
                                            placeholder="Sets"
                                            className="flex h-7 w-11 items-center justify-center rounded-md bg-black px-1 text-sm focus:border-0"
                                          />
                                        </div>

                                        <div className="group flex h-max w-max items-center justify-center">
                                          <input
                                            placeholder="Reps"
                                            className="flex h-7 w-11 items-center justify-center rounded-md bg-black px-1 text-sm focus:border-0"
                                            id="inputField"
                                            type="text"
                                            onChange={(e) => {
                                              const newTargetReps =
                                                e.target.value;

                                              setTemplateDay((prevDay) => ({
                                                ...prevDay,
                                                exerciseSpecifics:
                                                  prevDay.exerciseSpecifics!.map(
                                                    (item, index) =>
                                                      index === i
                                                        ? {
                                                            ...item,
                                                            targetReps:
                                                              newTargetReps,
                                                          }
                                                        : item,
                                                  ),
                                              }));
                                            }}
                                          />
                                        </div>

                                        <div className="flex h-max w-max items-center justify-center">
                                          <input
                                            className="flex h-7 w-11 items-center justify-center rounded-md bg-black px-2 text-sm"
                                            id="inputField"
                                            type="text"
                                            placeholder="RPE"
                                            onChange={(e) => {
                                              const newTargetRpe =
                                                e.target.value;

                                              setTemplateDay((prevDay) => ({
                                                ...prevDay,
                                                exerciseSpecifics:
                                                  prevDay.exerciseSpecifics!.map(
                                                    (item, index) =>
                                                      index === i
                                                        ? {
                                                            ...item,
                                                            targetRpe:
                                                              newTargetRpe,
                                                          }
                                                        : item,
                                                  ),
                                              }));
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="h-full w-full rounded-md border border-slate-700 p-2">
                            <span className="flex h-full w-full items-center justify-center text-center text-3xl font-medium text-white">
                              You have no exercises selected. Unlock your card
                              by pressing the {"(>>)"} button at the top and
                              send your exercises from the exercise list to
                              here.
                            </span>
                          </div>
                        )}
                      </>
                    </div>
                  </>
                </ul>
                <div className="flex w-full flex-col gap-6 xl:flex-row">
                  <CustomFormField
                    className="bg-zinc-950"
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="description"
                    label={
                      <span className="hidden text-white">Description</span>
                    }
                    placeholder={`Description`}
                  />
                </div>
                <>
                  {exerciseList.length > 0 ? (
                    <SubmitButton
                      className="absolute left-44 top-4 size-9 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-2 text-white"
                      isLoading={isLoading}
                    >
                      <CheckIcon className="size-5" />
                    </SubmitButton>
                  ) : (
                    <></>
                  )}
                </>
              </div>
            </form>
          </Form>
        </div>
        {toast.show && (
          <Toast
            message={toast.message}
            type={
              toast.type as "info" | "success" | "error" | "warning" | "action"
            }
            onClose={handleToastClose}
            actionLabel="success"
          />
        )}
      </div>
    </>
  );
};
export default DayTemplates;
