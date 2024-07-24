declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface UserAuth {
  email: string;
  password: string;
}

declare interface getUserInfo {
  userId: string;
}

declare interface User extends Omit<UserAuth, "password"> {
  $id?: string;
  name: string;
  userId: string;
  birthDate: Date;
  gender: Gender;
  description: string;
}

declare interface showUser {
  $id?: string;
  name: string;
  userId: string;
  birthDate: Date;
  gender: Gender;
  description: string;
}
