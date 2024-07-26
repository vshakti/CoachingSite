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
