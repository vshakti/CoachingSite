"use server";
import { convertFileToUrl } from "./../utils";

import { ID, Permission, Query, Role } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import { parseStringify } from "../utils";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { permission } from "process";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
  NEXT_PUBLIC_APPWRITE_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_APPWRITE_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT: PROJECT_ID,
  APPWRITE_EXERCISES_COLLECTION_ID: EXERCISES_COLLECTION_ID,
  APPWRITE_TRAINING_DAYS_COLLECTION_ID: TRAINING_DAYS_COLLECTION_ID,
  APPWRITE_EXERCISE_SPECIFICS_COLLECTION_ID: EXERCISE_SPECIFICS_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfo) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      [Query.equal("userId", [userId])],
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

interface CoachingStatusProps {
  isCoaching: boolean;
  userId: string;
}

export const CoachingStatus = async ({
  isCoaching,
  userId,
}: CoachingStatusProps) => {
  try {
    const { database } = await createAdminClient();
    const newUser = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      userId,
      {
        isCoaching,
      },
    );

    if (!newUser) throw Error;

    const parsedNewUser = parseStringify(newUser);

    return parsedNewUser;
  } catch (error) {
    console.log(error);
  }
};

export const Register = async ({ password, email }: UserAuth) => {
  try {
    const { account, database } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      undefined,
    );

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      ID.unique(),
      {
        email,
        userId: newUserAccount.$id,
      },
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error: any) {
    console.error(error);
  }
};

export const LogIn = async ({ email, password }: UserAuth) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(session);
  } catch (error) {
    console.log(error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function LogOut() {
  try {
    const { account } = await createSessionClient();
    cookies().delete("my-custom-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}

interface UpdateUser {
  name: string;
  userId: string;
  birthDate: Date;
  gender: Gender;
  description: string;
  phone: string;
}

export const UpdateUser = async ({
  name,
  userId,
  birthDate,
  gender,
  description,
  phone,
}: UpdateUser) => {
  try {
    const { database } = await createAdminClient();

    const newUser = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      userId,
      {
        name,
        birthDate,
        gender,
        description,
        phone,
      },
    );

    if (!newUser) throw Error;

    const parsedNewUser = parseStringify(newUser);

    return parsedNewUser;
  } catch (error) {
    console.log(error);
  }
};

export const ShowUserPicture = async (pictureId: string) => {
  try {
    const { storage } = await createAdminClient();

    const avatar = await storage.getFile(BUCKET_ID!, pictureId);

    return avatar;
  } catch (error) {
    console.log(error);
  }
};

interface UserImageData {
  imageBlob: any;
  userId: string | undefined;
}

export const UpdateUserProfilePicture = async ({
  imageBlob,
  userId,
}: UserImageData) => {
  try {
    const { database, storage } = await createAdminClient();

    let file;

    if (imageBlob) {
      const blobFile = new Blob([imageBlob], {
        type: "image/jpeg",
      });
      const fileName = "profile/pic" as string;

      file = InputFile.fromBuffer(blobFile, fileName);

      const upload = await storage.createFile(BUCKET_ID!, ID.unique(), file);

      const newPicture = await database.updateDocument(
        DATABASE_ID!,
        USERS_COLLECTION_ID!,
        userId!,
        {
          pictureId: upload.$id,
          pictureUrl: upload?.$id
            ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${upload.$id}/view??project=${PROJECT_ID}`
            : null,
        },
      );

      if (!newPicture) throw Error;

      const parsedNewUser = parseStringify(newPicture);

      return parsedNewUser;
    }
  } catch (error) {
    console.log(error);
  }
};

export const ExerciseCreationFunction = async (
  { name, video, description, muscles, exerciseOwner, exerciseId }: Exercise,
  userId: string,
) => {
  try {
    const { database } = await createAdminClient();

    const newExercise = await database.createDocument(
      DATABASE_ID!,
      EXERCISES_COLLECTION_ID!,
      ID.custom(exerciseId!),
      {
        name,
        video,
        description,
        muscles,
        exerciseId,
        exerciseOwner,
      },
    );

    const user = await getLoggedInUser();

    const currentExercises = user.exercises || [];

    const updatedExercises = [...currentExercises, newExercise];

    const newUser = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      userId,
      {
        exercises: updatedExercises,
      },
    );

    if (!newUser) throw Error;

    const parsedNewUser = parseStringify(newUser);

    return parsedNewUser;
  } catch (error: any) {
    console.error(error);
  }
};

export const UpdateExercise = async ({
  name,
  video,
  description,
  exerciseId,
  muscles,
}: Exercise) => {
  try {
    const { database } = await createAdminClient();

    const newExercise = await database.updateDocument(
      DATABASE_ID!,
      EXERCISES_COLLECTION_ID!,
      exerciseId!,
      { name, video, description, muscles },
    );

    if (!newExercise) throw Error;

    const parsednewExercise = parseStringify(newExercise);

    return parsednewExercise;
  } catch (error: any) {
    console.error(error);
  }
};

export const DeleteExercise = async ({ exerciseId }: Exercise) => {
  try {
    const { database } = await createAdminClient();

    const newExercise = await database.deleteDocument(
      DATABASE_ID!,
      EXERCISES_COLLECTION_ID!,
      exerciseId!,
    );

    if (!newExercise) throw Error;

    const parsednewExercise = parseStringify(newExercise);

    return parsednewExercise;
  } catch (error: any) {
    console.error(error);
  }
};

// export const ShowExercise = async () => {
//   try {
//     const { database } = await createAdminClient();

//     const user = await database.listDocuments(
//       DATABASE_ID!,
//       EXERCISES_COLLECTION_ID!,
//       // [Query.equal("userId", [userId])],
//     );

//     return parseStringify(user.documents);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const TemplateDayCreation = async (
  { name, description, type, exerciseSpecifics, creator }: TrainingDays,
  userId: string,
) => {
  try {
    const { database } = await createAdminClient();
    const user = await getLoggedInUser();
    const exerciseSpecificsIds = [];

    console.log("ids:", exerciseSpecifics);

    if (exerciseSpecifics) {
      for (let i = 0; i < exerciseSpecifics.length; i++) {
        const newExerciseSpecific = await database.createDocument(
          DATABASE_ID!,
          EXERCISE_SPECIFICS_COLLECTION_ID!,
          ID.unique(),
          {
            targetSets: exerciseSpecifics[i].targetSets,
            targetReps: exerciseSpecifics[i].targetReps,
            targetRpe: exerciseSpecifics[i].targetRpe,
            exercises: {
              name: exerciseSpecifics[i].exercises.name,
              video: exerciseSpecifics[i].exercises.video,
              description: exerciseSpecifics[i].exercises.description,
              muscles: exerciseSpecifics[i].exercises.muscles,
              exerciseId: exerciseSpecifics[i].exercises.exerciseId,
              exerciseOwner: exerciseSpecifics[i].exercises.exerciseOwner,
            },
          },
        );
        exerciseSpecificsIds.push(newExerciseSpecific.$id);
      }
    }

    const newTrainingDay = await database.createDocument(
      DATABASE_ID!,
      TRAINING_DAYS_COLLECTION_ID!,
      ID.unique(),
      {
        name,
        description,
        type,
        creator,
        exerciseSpecifics: exerciseSpecificsIds.map(
          (exerciseSpecific) => exerciseSpecific,
        ),
      },
    );

    const currentTrainingDays = user.trainingDays || [];

    const updatedTrainingDays = [...currentTrainingDays, newTrainingDay];

    const newUser = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      userId,
      {
        trainingDays: updatedTrainingDays,
      },
    );

    if (!newUser) throw Error;

    const parsedNewUser = parseStringify(newUser);

    return parsedNewUser;
  } catch (error: any) {
    console.error(error);
  }
};
