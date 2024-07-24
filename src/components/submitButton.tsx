import { LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";
import { MouseEventHandler } from "react";

interface ButtonProps {
  isLoading: boolean;
  click: MouseEventHandler;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({
  isLoading,
  className,
  children,
  click,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      onClick={click}
      className={
        className ??
        "h-11 w-full bg-cyan-600 px-3 text-lg font-medium text-white hover:bg-cyan-700 dark:text-neutral-200"
      }
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          Loading
          <LoaderIcon className="size-6 animate-spin" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
export default SubmitButton;
