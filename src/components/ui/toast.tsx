import React, { useEffect } from "react";

interface ToastProps {
  message: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "action";
  duration?: number;
  onClose: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  onAction,
  actionLabel = "Action",
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 rounded border border-neutral-500 px-4 py-2 text-white shadow-lg ${getToastClasses(type)}`}
    >
      <div className="flex items-center justify-between gap-x-8">
        <span className="max-w-40 text-sm font-medium">{message}</span>
        <div className="flex gap-4">
          {onAction && (
            <button
              className="rounded border border-neutral-500 bg-transparent px-2 py-1 text-sm text-white transition hover:border-yellow-500 hover:text-yellow-500"
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
          <button
            className="rounded border border-neutral-500 bg-transparent px-2 py-1 text-sm text-white transition hover:border-yellow-500 hover:text-yellow-500"
            onClick={onClose}
          >
            Close
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
      return "bg-black border-slate-700";
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-zinc-950";
  }
};

export default Toast;
