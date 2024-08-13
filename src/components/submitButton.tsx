import { LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "h-11 w-full px-3 text-lg font-medium text-white"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <LoaderIcon className="size-6 animate-spin text-cyan-500" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
export default SubmitButton;
