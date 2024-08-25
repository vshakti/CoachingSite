import { z } from "zod";
import { ExerciseFormDefaultValues } from "@/constants";

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

export const UserAuthValidation = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be at most 50 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const UserLoginValidation = z.object({
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
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number")
    .optional(),
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
  video: z.string().url().optional(),
  description: z
    .string()
    .max(500, "Your description must be at most 500 characters")
    .optional(),
  muscles: z.array(
    z.enum([
      "Cardio",
      "Adductors",
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
  ),
});

const ExerciseSpecificSchema = z.object({
  exercise: z.array(
    z.object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
      video: z.string().url().optional(),
      description: z
        .string()
        .max(500, "Your description must be at most 500 characters")
        .optional(),
      muscles: z.array(
        z.enum([
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
      ),
    }),
  ),
  targetReps: z.string(),
  targetSets: z.string(),
  targetRpe: z.string(),
});

export const TemplateDayCreationValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  description: z
    .string()
    .max(500, "Your description must be at most 500 characters")
    .optional(),
  type: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

const SetSchema = z.object({
  reps: z.number().int().positive(),
  rpe: z.number().int().positive(),
});

export const ExerciseProgressionValidation = z
  .object({
    sets: z.array(z.number().int().positive()).nonempty("Sets cannot be empty"),
    reps: z.array(z.number().int().positive()).nonempty("Reps cannot be empty"),
    rpe: z.array(z.number().int().positive()).nonempty("RPE cannot be empty"),
    weight: z
      .array(z.number().int().positive())
      .nonempty("RPE cannot be empty"),
    feedback: z
      .string()
      .max(500, "Your feedback must be at most 500 characters")
      .optional(),
  })
  .refine((data) => data.reps.length === data.rpe.length, {
    message: "The lengths of reps and rpe arrays must be the same",
  });
