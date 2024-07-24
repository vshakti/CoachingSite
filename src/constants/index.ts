export const GenderOptions = ["Male", "Female", "Other"];

export const UserFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  description: "",
  clients: [],
  isCoaching: false,
};
