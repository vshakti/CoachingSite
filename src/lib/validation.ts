import { z } from "zod";

// const Gender = z.enum(["Male", "Female", "Other"]);

export const UserFormValidation = z.object({
  // name: z
  //   .string()
  //   .min(2, "Name must be at least 2 characters")
  //   .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Name must be at least 8 characters")
    .max(50, "Name must be at most 50 characters"),
  // userId: z.string(),
  // birthDate: z.date(),
  // gender: Gender,
  // avatar: z.string(),
  // isCoaching: z.boolean(),
  // privacyConsent: z.boolean(),
});
