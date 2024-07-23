import { Models } from "node-appwrite";

export interface Users extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  isCoaching: boolean;
  avatar: string;
  privacyConsent: boolean;
}

// export interface Appointment extends Models.Document {
//   client: User;
//   schedule: Date;
//   status: Status;
//   primaryPhysician: string;
//   reason: string;
//   note: string;
//   userId: string;
//   cancellationReason: string | null;
// }
