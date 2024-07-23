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

declare interface User extends UserAuth {
  $id?: string;
  name?: string;
  userId?: string;
  birthDate?: Date;
  gender?: Gender;
  isCoaching?: boolean;
  avatar?: string;
  privacyConsent?: boolean;
}

declare interface UserId {
  userId: string;
}

// declare type CreateAppointmentParams = {
//   userId: string;
//   patient: string;
//   primaryPhysician: string;
//   reason: string;
//   schedule: Date;
//   status: Status;
//   note: string | undefined;
// };

// declare type UpdateAppointmentParams = {
//   appointmentId: string;
//   userId: string;
//   appointment: Appointment;
//   type: string;
// };
