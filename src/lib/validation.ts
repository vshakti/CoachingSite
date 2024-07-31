import { z } from "zod";

const Gender = z.enum(["Male", "Female", "Other"]);
const Muscle = z.enum([
  "Cardio",
  "Biceps",
  "Calves",
  "Chest",
  "Core",
  "Erectors",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Latissimus",
  "Quadriceps",
  "Shoulders",
  "Trapezius",
  "Triceps",
]);

export const UserAuthValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
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

export const ExerciseCreationValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  video: z.string().optional(),
  description: z
    .string()
    .max(500, "Your description must be at most 500 characters"),
  muscle: z.enum([
    "Cardio",
    "Biceps",
    "Calves",
    "Chest",
    "Core",
    "Erectors",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Latissimus",
    "Quadriceps",
    "Shoulders",
    "Trapezius",
    "Triceps",
  ]),
});
