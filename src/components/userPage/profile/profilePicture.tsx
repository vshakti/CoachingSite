"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import AvatarEditor from "react-avatar-editor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPictureValidation } from "@/lib/validation";
import {
  ShowUserPicture,
  UpdateUserProfilePicture,
} from "@/lib/actions/user.actions";
import {
  UserRoundIcon,
  CloudUploadIcon,
  CameraIcon,
  CameraOffIcon,
} from "lucide-react";
import { useUserAvatar } from "@/lib/context/userAvatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const SubmitButton = dynamic(() => import("@/components/submitButton"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface ProfilePicProps {
  user: User;
}

const ProfilePicture = ({ user }: ProfilePicProps) => {
  const [image, setImage] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { userAvatar, setUserAvatar } = useUserAvatar();
  const router = useRouter();

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

        setUserAvatar(newUserPicture.pictureUrl);
        setImage("");
        router.refresh();
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.pictureUrl) {
      const storageKey = `userAvatar_${btoa(user.pictureUrl)}`;
      const cachedAvatar = localStorage.getItem(storageKey);

      if (cachedAvatar) {
        setUserAvatar(cachedAvatar);
      } else {
        (async () => {
          try {
            const base64String = await ShowUserPicture(user.pictureUrl);
            const newAvatar = `data:image/png;base64,${base64String}`;
            localStorage.setItem(storageKey, newAvatar);
            setUserAvatar(newAvatar);
          } catch (error) {
            console.error("Error fetching or converting image:", error);
          }
        })();
      }
    }
  }, [user.pictureUrl, setUserAvatar, userAvatar]);

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
                <button
                  onClick={() => {
                    setImage("");
                  }}
                  className={`absolute -right-3 top-0 flex cursor-pointer items-center gap-1 rounded-full bg-neutral-950 px-4 py-2`}
                >
                  <CameraOffIcon className="size-8 text-cyan-600" />
                </button>

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
                  className={`absolute -right-3 bottom-10 flex cursor-pointer items-center gap-1 rounded-full bg-neutral-950 px-4 py-2`}
                >
                  <CameraIcon className="size-8 text-cyan-600" />

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
                  isLoading={isLoading}
                  className={`absolute -left-3 bottom-10 flex h-12 items-center rounded-full bg-neutral-950 px-4 py-2`}
                >
                  <CloudUploadIcon className="size-8 text-cyan-600" />
                </SubmitButton>
              </div>
            ) : (
              <div className="relative flex w-max flex-col items-center gap-y-2 px-8">
                {userAvatar ? (
                  <Image
                    height={200}
                    width={200}
                    quality={100}
                    src={userAvatar!}
                    className="size-48 rounded-full bg-center"
                    alt="User Avatar"
                  />
                ) : (
                  <div>
                    <UserRoundIcon className="size-48 rounded-full border-2 border-neutral-400 bg-neutral-500 text-neutral-300" />
                  </div>
                )}

                <label
                  form="doc"
                  className={`absolute -right-4 bottom-0 flex cursor-pointer items-center gap-1 rounded-full bg-neutral-950 px-4 py-2`}
                >
                  <CameraIcon className="size-8 text-cyan-600" />

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
