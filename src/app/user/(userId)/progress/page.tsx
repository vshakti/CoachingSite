import { Progress } from "@/components/userPage/progress/progress";

export const metadata = {
  title: "Progress",
};

const UserProgress = () => {
  return (
    <div className="flex h-full">
      <Progress className="font grid h-screen w-full gap-6 p-6 text-white antialiased lg:ml-6 lg:grid-cols-6 lg:grid-rows-6" />
    </div>
  );
};
export default UserProgress;
