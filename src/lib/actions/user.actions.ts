"use server";

import { ID, Query } from "node-appwrite";
// import { users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USERS_COLLECTION_ID,
} = process.env;

// export const getUserInfo = async ({ userId }: getUserInfoProps) => {
//   try {
//     const { database } = await createAdminClient();

//     const user = await database.listDocuments(
//       DATABASE_ID!,
//       USERS_COLLECTION_ID!,
//       [Query.equal("userId", [userId])],
//     );

//     return parseStringify(user.documents[0]);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const Register = async (user: UserAuth) => {
  try {
    const { account } = await createAdminClient();
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      undefined,
    );

    const session = await account.createEmailPasswordSession(
      user.email,
      user.password,
    );

    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    console.log(newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
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

    return parseStringify(account);
  } catch (error) {
    console.log("Error:", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    return parseStringify(result);
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
