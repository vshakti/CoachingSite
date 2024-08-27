"use client";

import {
  CalendarPlusIcon,
  CheckIcon,
  ChevronsRightIcon,
  EraserIcon,
  LockIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TemplateDayCreationValidation } from "@/lib/validation";
import { FormFieldType } from "@/lib/exports/exports";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateDayDefaultValues } from "@/constants";
import { useRouter } from "next/navigation";
import {
  getLoggedInUser,
  TemplateDayCreation,
} from "@/lib/actions/user.actions";
import { useExerciseContext } from "@/lib/context/exerciseAdd";
import dynamic from "next/dynamic";
import { useLoggedUser } from "@/lib/context/loggedUser";
const Toast = dynamic(() => import("@/components/ui/toast"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const SubmitButton = dynamic(() => import("@/components/submitButton"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const CustomFormField = dynamic(
  () => import("@/components/ui/customFormField"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

interface ShowToastParams {
  message: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "action";
}

const DayTemplates = () => {
  const [dayTemplateIsOpen, setDayTemplateIsOpen] = useState(true);
  const {
    exerciseList,
    setExerciseList,
    templateDay,
    setTemplateDay,
    isAdding,
    setIsAdding,
  } = useExerciseContext();
  const { loggedUser, setLoggedUser } = useLoggedUser();
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
        creator: loggedUser!.email,
      };

      const userId = loggedUser!.$id;

      const dayTemplate = await TemplateDayCreation(templateData, userId!);

      const newUser = await getLoggedInUser();
      setLoggedUser(newUser);
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
        message: <CheckIcon className="size-5" />,
        type: "success",
      });
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setDayTemplateIsOpen(!dayTemplateIsOpen);
        }}
        className={`${!dayTemplateIsOpen ? "" : "hidden"} flex animate-pulse flex-col items-center justify-center gap-y-2 bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 px-8 py-2`}
      >
        <CalendarPlusIcon className="size-12 p-2 text-white" />

        <h1 className="text-lg font-medium tracking-wide text-white antialiased">
          CREATE YOUR TRAINIG DAYS
        </h1>
      </button>

      <div
        className={`${dayTemplateIsOpen ? "flex h-max w-full flex-col px-1 text-white" : "hidden"} max-h-[640px] max-w-[440px] transition-transform duration-500 md:max-w-[580px]`}
      >
        <div className="relative flex h-[596px] flex-col items-center justify-center gap-y-2 rounded-lg border bg-gradient-to-br from-gray-950 via-zinc-950 to-gray-950 p-4">
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
              <XIcon className="size-9" />
            </button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full w-full"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-xl px-3 py-1">
                <h3 className="flex h-10 w-full items-center justify-between bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 px-2 pb-2 ring-cyan-500 ring-offset-0 group-focus-within:ring-1">
                  <div className="flex w-3/4 flex-row items-end justify-end">
                    <CustomFormField
                      fieldType={FormFieldType.TEMPLATE_DAY}
                      name="name"
                      label={<span className="hidden text-white"></span>}
                      placeholder={`Training day name`}
                      iconSrc={<></>}
                      control={form.control}
                    />
                  </div>
                  <div className="flex h-full w-1/3 items-center justify-center">
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
                                    <div className="flex flex-row items-center justify-center gap-x-3 bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 px-4 py-1 text-white">
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
                                          <Trash2Icon className="size-5 hover:text-cyan-400" />
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
                                            className="flex h-7 w-11 items-center justify-center rounded-md bg-black/50 px-1 text-xs focus:border-0"
                                          />
                                        </div>

                                        <div className="group flex h-max w-max items-center justify-center">
                                          <input
                                            placeholder="Reps"
                                            className="flex h-7 w-11 items-center justify-center rounded-md bg-black/50 px-1 text-xs focus:border-0"
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
                                            className="flex h-7 w-11 items-center justify-center rounded-md bg-black/50 px-2 text-xs"
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
                          <div className="h-full w-full bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0 p-2">
                            <span className="flex h-full w-full flex-col items-center justify-center gap-3 px-5 text-xs font-medium tracking-wider text-white lg:text-base">
                              <p>1: Name your day</p>
                              <p>2: Define your day by a custom type</p>
                              <p className="flex items-center gap-1">
                                3: Unlock your exercises by clicking
                                <ChevronsRightIcon
                                  className={`flex size-4 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-0.5`}
                                />
                              </p>
                              <p className="flex items-center gap-1">
                                4: Add your exercises by clicking
                                <ChevronsRightIcon className="size-4" />
                                on them
                              </p>
                              <p>5: Define your sets, reps and rpe</p>
                              <p>6: Add a description for your day</p>
                              <p className="flex items-center gap-1">
                                7: Click on the
                                <CheckIcon className="size-4 rounded-full border bg-gradient-to-br from-slate-950 to-violet-950 p-0.5" />
                                to create your day
                              </p>
                            </span>
                          </div>
                        )}
                      </>
                    </div>
                  </>
                </ul>
                <div className="flex w-full flex-col gap-6 xl:flex-row">
                  <CustomFormField
                    className="border-0 bg-gradient-to-r from-slate-950/0 via-violet-950/60 to-slate-950/0"
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
