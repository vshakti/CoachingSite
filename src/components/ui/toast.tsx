import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ToastProps {
  message: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "action";
  duration?: number;
  onClose: () => void;
  onAction?: () => void;
  actionLabel?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  onAction,
  actionLabel = "Action",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform rounded-lg border border-neutral-700 bg-zinc-950 text-white shadow-lg transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-x-8">
        <span
          className={`${getToastClasses(type)} flex max-w-40 items-center justify-center rounded-l-lg py-2 text-sm font-medium`}
        >
          {message}
        </span>
        <div className="flex gap-4 py-2 pr-2">
          {onAction && (
            <button
              className="px-2 py-1 text-sm text-white transition hover:text-yellow-400"
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
          <button
            className="px-2 py-1 text-sm text-white transition hover:text-yellow-400"
            onClick={() => setVisible(false)}
          >
            <XIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const getToastClasses = (
  type: "info" | "success" | "error" | "warning" | "action",
): string => {
  switch (type) {
    case "success":
      return "bg-green-600 w-16 h-16";
    case "error":
      return "bg-red-600";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-zinc-950";
  }
};

export default Toast;
