export const GenderOptions = ["Male", "Female", "Other"];
export const MuscleOptions = [
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
];

export const UserFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  description: "",
  clients: [],
  isCoaching: false,
  picture: "",
};

export const UserPictureDefaultValue = {
  imageBlob: [],
};

export const ExerciseFormDefaultValues = {
  name: "",
  muscle: "Cardio" as Muscles,
  description: "",
  video: "",
};
