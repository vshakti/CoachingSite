"use server";

import { ID, Query, Role } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { parseStringify } from "../utils";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { cookies } from "next/headers";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
  NEXT_PUBLIC_APPWRITE_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_APPWRITE_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT: PROJECT_ID,
  APPWRITE_EXERCISES_COLLECTION_ID: EXERCISES_COLLECTION_ID,
  APPWRITE_TRAINING_DAYS_COLLECTION_ID: TRAINING_DAYS_COLLECTION_ID,
  APPWRITE_EXERCISE_SPECIFICS_COLLECTION_ID: EXERCISE_SPECIFICS_COLLECTION_ID,
  APPWRITE_TRAINING_WEEK_COLLECTION_ID: TRAINING_WEEK_COLLECTION_ID,
  APPWRITE_TRAINING_DAYS_SPECIFICS_COLLECTION_ID:
    TRAINING_DAYS_SPECIFICS_COLLECTION_ID,
  APPWRITE_EXERCISE_PROGRESSION_COLLECTION_ID:
    EXERCISE_PROGRESSION_COLLECTION_ID,
  APPWRITE_PROGRESSION_LIST_COLLECTION_ID: PROGRESSION_LIST_COLLECTION_ID,
  APPWRITE_CHAT_ROOM_COLLECTION_ID: CHAT_ROOM_COLLECTION_ID,
  APPWRITE_MESSAGES_COLLECTION_ID: MESSAGES_COLLECTION_ID,
  APPWRITE_CLIENT_STATUS_COLLECTION_ID: CLIENT_STATUS_COLLECTION_ID,
  APPWRITE_CLIENTS_COLLECTION_ID: CLIENTS_COLLECTION_ID,
} = process.env;

export const getAllUsers = async () => {
  try {
    const { database } = await createAdminClient();
    const result = await database.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
    );

    return parseStringify(result.documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

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
    const response = await fetch(pictureId);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const text = await response.text();

    if (!text.startsWith("data:image/png;base64,")) {
      throw new Error("Invalid Base64 data");
    }

    return text.split(",")[1];
  } catch (error) {
    console.error("Error in ShowUserPicture:", error);
    throw error;
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
      ID.unique(),
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

export const ExerciseProgressionUpdate = async (
  progressionData: ExerciseProgression,
  userId: string,
  exerciseName: string,
  exerciseId: string,
) => {
  try {
    const { database } = await createAdminClient();
    const user: User = await getLoggedInUser();

    //CREATE THE EXERCISE PROGRESSION
    const newExerciseProgression = await database.createDocument(
      DATABASE_ID!,
      EXERCISE_PROGRESSION_COLLECTION_ID!,
      ID.unique(),
      {
        ...progressionData,
      },
    );

    let progressionList;

    //CHECK IF AN EXERCISE PROGRESSION WITH THIS EXERCISE ID ALREADY EXISTS
    try {
      progressionList = await database.getDocument(
        DATABASE_ID!,
        PROGRESSION_LIST_COLLECTION_ID!,
        exerciseId!,
      );
    } catch (error: any) {
      if (error.code === 404) {
        //IF DOESN'T EXIST CREATE ONE
        const newExerciseProgressionList = await database.createDocument(
          DATABASE_ID!,
          PROGRESSION_LIST_COLLECTION_ID!,
          ID.custom(exerciseId),
          {
            exerciseName,
            exerciseId,
          },
        );

        //GET THE ACTUAL VALUE OF THE NEW CREATED LIST
        const updatedExerciseProgression = [
          ...(newExerciseProgressionList.exerciseProgression || []),
          newExerciseProgression,
        ];

        //UPDATE THE NEW LIST WITH THE EXERCISE PROGRESSION
        const updateNewList = await database.updateDocument(
          DATABASE_ID!,
          PROGRESSION_LIST_COLLECTION_ID!,
          newExerciseProgressionList.$id,
          {
            exerciseProgression: updatedExerciseProgression,
          },
        );

        //GET THE ACTUAL LIST OF EXERCISES LIST FOR THE USER
        const updatedExerciseList = [
          ...(user.progressionList || []),
          updateNewList,
        ];

        //PUSH THIS LIST TO THE USER
        const updateUser = await database.updateDocument(
          DATABASE_ID!,
          USERS_COLLECTION_ID!,
          userId!,
          {
            progressionList: updatedExerciseList,
          },
        );

        if (!updateUser) throw Error;

        const parsedNewUser = parseStringify(updateUser);
        return parsedNewUser;
      } else {
        throw error;
      }
    }

    //IF THIS LIST ALREADY EXISTS GET THE LIST BY THE EXERCISE ID
    //GET THE ACTUAL VALUE OF THE LIST
    const updatedExerciseProgression = [
      ...(progressionList.exerciseProgression || []),
      newExerciseProgression,
    ];

    //UPDATE THE LIST WITH THE EXERCISE PROGRESSION
    const updateNewList = await database.updateDocument(
      DATABASE_ID!,
      PROGRESSION_LIST_COLLECTION_ID!,
      exerciseId!,
      {
        exerciseProgression: updatedExerciseProgression,
      },
    );

    if (!updateNewList) throw Error;

    const parsedNewList = parseStringify(updateNewList);
    return parsedNewList;
  } catch (error) {
    console.error("Error updating exercise progression:", error);
    throw error;
  }
};

export const DeleteExercise = async (exerciseId: string) => {
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

export const TemplateDayCreation = async (
  { name, description, type, exerciseSpecifics, creator }: TrainingDays,
  userId: string,
) => {
  try {
    const { database } = await createAdminClient();
    const user = await getLoggedInUser();
    const exerciseSpecificsIds = [];

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
            exercises: [exerciseSpecifics[i].exercises.$id],
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

    const updatededTrainingDayId = await database.updateDocument(
      DATABASE_ID!,
      TRAINING_DAYS_COLLECTION_ID!,
      newTrainingDay.$id,
      {
        trainingDayId: newTrainingDay.$id,
      },
    );
    const currentTrainingDays = user.trainingDays || [];

    const updatedTrainingDays = [
      ...currentTrainingDays,
      updatededTrainingDayId,
    ];

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

export const CreateTrainingWeek = async (
  weeklyTraining: TrainingWeek,
  name: string,
  userId: string,
) => {
  try {
    const { database } = await createAdminClient();
    const user = await getLoggedInUser();

    const trainingDaysSpecificsIds = [];

    if (weeklyTraining) {
      for (let i = 0; i < weeklyTraining.length; i++) {
        const newtrainingDaysSpecific = await database.createDocument(
          DATABASE_ID!,
          TRAINING_DAYS_SPECIFICS_COLLECTION_ID!,
          ID.unique(),
          {
            iD: weeklyTraining[i].trainingDays?.$id,
            isRest: weeklyTraining[i].isRest,
            trainingDays: weeklyTraining[i].trainingDays?.$id,
          },
        );
        trainingDaysSpecificsIds.push(newtrainingDaysSpecific.$id);
      }
    }

    const newTrainingWeek = await database.createDocument(
      DATABASE_ID!,
      TRAINING_WEEK_COLLECTION_ID!,
      ID.unique(),
      {
        name,
        trainingDaySpecifics: trainingDaysSpecificsIds.map((days) => days),
      },
    );
    const currentTrainingWeek = user.trainingWeek || [];

    const updatedtrainingWeek = [...currentTrainingWeek, newTrainingWeek];

    const newUser = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      userId,
      {
        trainingWeek: updatedtrainingWeek,
      },
    );

    if (!newUser) throw Error;

    const parsedNewUser = parseStringify(newUser);

    return parsedNewUser;
  } catch (error: any) {
    console.error(error);
  }
};

export const DeleteTrainingDay = async (TrainingDayId: string) => {
  try {
    const { database } = await createAdminClient();

    const newTrainingDay = await database.deleteDocument(
      DATABASE_ID!,
      TRAINING_DAYS_COLLECTION_ID!,
      TrainingDayId!,
    );

    if (!newTrainingDay) throw Error;

    const parsedNewTrainingDay = parseStringify(newTrainingDay);

    return parsedNewTrainingDay;
  } catch (error: any) {
    console.error(error);
  }
};

export const getTrainingDay = async (trainingDayId: string) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      TRAINING_DAYS_COLLECTION_ID!,
      [Query.equal("trainingDayId", [trainingDayId])],
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const inviteForCoaching = async (
  user: User,
  selectedUserId: string,
  status: string,
) => {
  try {
    const { database } = await createAdminClient();

    const actualUser = await database.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      [Query.equal("userId", [selectedUserId])],
    );

    if (!actualUser.documents[0].clientStatus) {
      const newInvite = await database.updateDocument(
        DATABASE_ID!,
        USERS_COLLECTION_ID!,
        actualUser.documents[0].$id,
        {
          clientStatus: {
            status,
            users: user,
          },
        },
      );
      if (!newInvite) throw Error;

      const parsedNewInvite = parseStringify(newInvite);

      return parsedNewInvite;
    } else {
      const newInvite = await database.updateDocument(
        DATABASE_ID!,
        CLIENT_STATUS_COLLECTION_ID!,
        actualUser.documents[0].clientStatus.$id,
        {
          status,
          users: user,
        },
      );
      if (!newInvite) throw Error;

      const parsedNewInvite = parseStringify(newInvite);

      return parsedNewInvite;
    }
  } catch (error) {
    console.log(error);
  }
};

export const denyCoachingInvite = async (statusId: string, status: string) => {
  try {
    const { database } = await createAdminClient();

    const newInvite = await database.updateDocument(
      DATABASE_ID!,
      CLIENT_STATUS_COLLECTION_ID!,
      statusId,
      {
        status,
        users: null,
      },
    );
    if (!newInvite) throw Error;

    const parsedNewInvite = parseStringify(newInvite);

    return parsedNewInvite;
  } catch (error) {
    console.log(error);
  }
};

export const acceptCoachingInvite = async (
  statusId: string,
  status: string,
  user: User,
) => {
  try {
    const { database } = await createAdminClient();

    const newInvite = await database.updateDocument(
      DATABASE_ID!,
      CLIENT_STATUS_COLLECTION_ID!,
      statusId,
      {
        status,
        users: user,
      },
    );
    if (!newInvite) throw Error;

    const newClient = await getLoggedInUser();

    const coach = await database.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      [Query.equal("userId", [user.userId])],
    );

    if (!coach.documents[0].clients) {
      const newClients = await database.createDocument(
        DATABASE_ID!,
        CLIENTS_COLLECTION_ID!,
        ID.unique(),
        {
          users: [newClient.$id],
        },
      );

      const newCoach = await database.updateDocument(
        DATABASE_ID!,
        USERS_COLLECTION_ID!,
        coach.documents[0].$id,
        {
          clients: newClients,
        },
      );
      const parsedNewCoach = parseStringify(newCoach);

      return parsedNewCoach;
    } else {
      const currentCoachClients = coach.documents[0].clients || [];

      const updatedCoachClients = [...currentCoachClients, newClient];

      const newCoach = await database.updateDocument(
        DATABASE_ID!,
        USERS_COLLECTION_ID!,
        coach.documents[0].$id,
        {
          clients: updatedCoachClients,
        },
      );
      const parsedNewCoach = parseStringify(newCoach);

      return parsedNewCoach;
    }
  } catch (error) {
    console.log(error);
  }
};

// interface MessageProps {
//   body: string;
//   sender: string;
// }

// export const sendMessage = async (
//   currentUserId: string,
//   selectedUserId: string,
//   { body, sender }: MessageProps,
// ) => {
//   try {
//     const { database } = await createAdminClient();
//     const chatRooms = await database.listDocuments(
//       DATABASE_ID!,
//       CHAT_ROOM_COLLECTION_ID!,
//       [Query.equal("usersId", [currentUserId, selectedUserId])],
//     );

//     let chatRoomId;
//     if (chatRooms.documents.length > 0) {
//       chatRoomId = chatRooms.documents[0].$id;
//     } else {
//       const newChatRoom = await database.createDocument(
//         DATABASE_ID!,
//         CHAT_ROOM_COLLECTION_ID!,
//         ID.unique(),
//         {
//           users: [currentUserId, selectedUserId],
//           messages: [],
//         },
//       );
//       chatRoomId = newChatRoom.$id;
//     }

//     await database.updateDocument(
//       DATABASE_ID!,
//       CHAT_ROOM_COLLECTION_ID!,
//       chatRoomId,
//       {
//         messages: {
//           body: body,
//           sender: sender,
//         },
//       },
//     );

//     console.log("Message sent successfully.");
//   } catch (error) {
//     console.error("Error sending message:", error);
//   }
// };

// export const getChatRoomMessages = async (
//   currentUserId: string,
//   selectedUserId: string,
// ) => {
//   try {
//     const { database } = await createAdminClient();
//     const response = await database.listDocuments(
//       DATABASE_ID!,
//       CHAT_ROOM_COLLECTION_ID!,
//       [Query.equal("usersId", [currentUserId, selectedUserId])],
//     );

//     if (response.documents.length > 0) {
//       const chatRoom = response.documents[0];
//       return chatRoom.messages;
//     } else {
//       console.error("Chat room not found.");
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching chat room messages:", error);
//     return [];
//   }
// };
