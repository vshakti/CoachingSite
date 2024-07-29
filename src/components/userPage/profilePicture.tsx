"use client";

import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPictureValidation } from "@/lib/validation";
import { UserPictureDefaultValue } from "@/constants";
import SubmitButton from "../submitButton";
import { useUser } from "@/lib/context/user";
import { UpdateUserProfilePicture } from "@/lib/actions/user.actions";
import {
  UserRoundIcon,
  CloudUploadIcon,
  ArrowDownToLineIcon,
} from "lucide-react";

const ProfilePicture: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const form = useForm<z.infer<typeof UserPictureValidation>>({
    resolver: zodResolver(UserPictureValidation),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  const onSubmit = async (values: z.infer<typeof UserPictureValidation>) => {
    setIsLoading(true);

    if (editorRef.current) {
      const canvas = editorRef.current.getImage().toDataURL();

      try {
        const userPicture = {
          userId: user?.$id,
          imageBlob: canvas,
        };

        const picId = user?.pictureId;

        const newUserPicture = await UpdateUserProfilePicture(userPicture);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-col items-center justify-center">
            {image ? (
              <div className="relative flex w-max flex-col items-center px-8">
                <AvatarEditor
                  ref={editorRef}
                  image={image}
                  width={200}
                  height={200}
                  border={0}
                  borderRadius={180}
                  scale={scale}
                  rotate={0}
                  className="mb-4 rounded-full border-2 bg-white"
                />
                <div className="flex flex-col items-center px-2">
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={scale}
                    onChange={handleScaleChange}
                    className="mb-4 h-2 cursor-pointer appearance-none rounded-lg bg-neutral-400 dark:bg-neutral-600"
                  />
                </div>

                <label
                  form="doc"
                  className={`absolute bottom-10 right-0 flex cursor-pointer items-center gap-1 rounded-full border-cyan-600 bg-neutral-400/60 p-2 dark:border-neutral-400 dark:bg-neutral-700/90`}
                >
                  <ArrowDownToLineIcon className="size-8 text-cyan-600" />

                  <input
                    type="file"
                    id="doc"
                    name="doc"
                    accept="png, jpg"
                    hidden
                    onChange={handleFileChange}
                  />
                </label>

                <SubmitButton
                  click={() => {}}
                  isLoading={isLoading}
                  className={`absolute bottom-10 left-0 flex h-12 cursor-pointer items-center rounded-full border-cyan-600 bg-neutral-400/60 p-2 dark:border-neutral-400 dark:bg-neutral-700/90`}
                >
                  <CloudUploadIcon className="size-8 text-cyan-600" />
                </SubmitButton>
              </div>
            ) : (
              <div className="relative flex w-max flex-col items-center gap-y-2 px-8">
                <div>
                  <UserRoundIcon className="size-48 rounded-full border-2 border-neutral-400 bg-neutral-200 text-neutral-400 dark:bg-neutral-500 dark:text-neutral-300" />
                </div>

                <label
                  form="doc"
                  className={`absolute bottom-0 right-0 flex cursor-pointer items-center gap-1 rounded-full border-cyan-600 bg-neutral-400/60 p-2 dark:border-neutral-400 dark:bg-neutral-700/90`}
                >
                  <ArrowDownToLineIcon className="size-8 text-cyan-600" />

                  <input
                    type="file"
                    id="doc"
                    name="doc"
                    accept="png, jpg"
                    hidden
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfilePicture;
