export function extractYouTubeId(url: string): string | null {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);

  return match ? match[1] : null;
}

export function calculateAge(birthday: Date | undefined) {
  if (birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}

export function getYouTubeEmbedUrl(url: string): string | undefined {
  const videoId = extractYouTubeId(url);

  return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
}

export const GenderOptions = ["Male", "Female", "Other"];
export const MuscleOptions = [
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
  muscles: [],
  description: "",
  video: undefined,
};

export const TemplateDayDefaultValues = {
  name: "",
  description: "",
  type: "",
};

export const WeekDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const ExerciseProgressionDefaultValues = {
  sets: 0,
  series: 0,
  rpe: 0,
  feedback: "",
};
