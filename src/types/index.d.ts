declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Muscles =
  | "Cardio"
  | "Biceps"
  | "Calves"
  | "Chest"
  | "Core"
  | "Erectors"
  | "Forearms"
  | "Glutes"
  | "Hamstrings"
  | "Latissimus"
  | "Quadriceps"
  | "Shoulders"
  | "Trapezius"
  | "Triceps";

declare type MusclesArray = Muscles[];

declare interface UserAuth {
  email: string;
  password: string;
}

declare interface getUserInfo {
  userId: string;
  pictureId?: string;
}

declare interface User extends Omit<UserAuth, "password">, UserPicture {
  $id?: string;
  name: string;
  userId: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  description: string;
  pictureUrl: string;
  pictureId: string;
  isCoaching: boolean;
  exercises: Exercise[];
}

declare interface showUser extends UserPicture {
  $id?: string;
  name: string;
  phone: string;
  userId: string;
  birthDate: Date;
  gender: Gender;
  description: string;
  pictureUrl: string;
}

declare interface UserPicture {
  imageBlob: any;
}

declare interface Exercise {
  $id?: string;
  exerciseId?: string | undefined;
  name: string;
  description?: string;
  video?: URL;
  muscles: MusclesArray;
  exerciseOwner?: string;
}
