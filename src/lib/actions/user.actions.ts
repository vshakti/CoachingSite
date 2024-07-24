"use server";

import { ID, Query } from "node-appwrite";
// import { users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import store from "../redux/reduxStore";
import { setUser } from "../redux/reduxSlice";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
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

export const UpdateUser = async ({
  name,
  userId,
  birthDate,
  gender,
  description,
}: showUser) => {
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
      },
    );

    const parsedNewUser = parseStringify(newUser);
    store.dispatch(setUser(parsedNewUser));

    return parsedNewUser;
  } catch (error) {
    console.log(error);
  }
};
