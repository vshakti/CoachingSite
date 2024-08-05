import { Models } from "node-appwrite";

export interface Users extends Models.Document {
  userId: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  isCoaching: boolean;
  pictureUrl: string;
  pictureId: string;
  exercises: [];
  trainingDays: [];
}
