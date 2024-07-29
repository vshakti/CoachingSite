"use server";
import { convertFileToUrl } from "./../utils";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import { parseStringify } from "../utils";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import store from "../redux/reduxStore";
import { setUser } from "../redux/reduxSlice";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
  NEXT_PUBLIC_APPWRITE_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_APPWRITE_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT: PROJECT_ID,
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

export const Register = async ({ password, email }: UserAuth) => {
  try {
    let file;

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
    store.dispatch(setUser(parsedNewUser));

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

// export const teste = async () => {
//   const foo = await createAdminClient();
//   console.log("foo", foo);
//   console.log("STRING foo", JSON.stringify(foo, null, 2));
// };

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
