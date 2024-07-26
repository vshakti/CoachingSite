import { z } from "zod";

const Gender = z.enum(["Male", "Female", "Other"]);

export const UserAuthValidation = z.object({
  // name: z
  //   .string()
  //   .min(2, "Name must be at least 2 characters")
  //   .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
  // userId: z.string(),
  // birthDate: z.date(),
  // gender: Gender,
  // avatar: z.string(),
  // isCoaching: z.boolean(),
  // privacyConsent: z.boolean(),
});

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  description: z
    .string()
    .max(500, "Your description must be at most 500 characters"),
});

export const UserPictureValidation = z.object({
  imageBlob: z.custom<File>(),
});
