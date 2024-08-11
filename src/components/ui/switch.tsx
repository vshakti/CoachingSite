import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  className,
}) => {
  return (
    <div
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-5 w-11 cursor-pointer items-center rounded-full border transition-colors ${className} ${checked ? "border-slate-950 bg-cyan-500" : "bg-transparent"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full transition-transform ${checked ? "translate-x-6 bg-slate-950" : "translate-x-0.5 bg-white"}`}
      />
    </div>
  );
};

export default Switch;
