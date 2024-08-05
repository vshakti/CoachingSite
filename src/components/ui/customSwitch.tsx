import Switch from "@/components/ui/switch";
import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface CustomSwitchGroupProps {
  name: string;
  options: string[];
  control: Control<any>;
}

const CustomSwitchGroup: React.FC<CustomSwitchGroupProps> = ({
  name,
  options,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="grid grid-cols-2 gap-4 rounded-md border border-slate-700 bg-slate-950 p-2 md:grid-cols-3 lg:grid-cols-4">
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <Switch
                className=""
                checked={
                  Array.isArray(field.value) && field.value.includes(option)
                }
                onCheckedChange={(checked) => {
                  const currentValue = Array.isArray(field.value)
                    ? field.value
                    : [];
                  if (checked) {
                    field.onChange([...currentValue, option]);
                  } else {
                    field.onChange(
                      currentValue.filter((item: string) => item !== option),
                    );
                  }
                }}
              />
              <Label className="ml-2 text-white">{option}</Label>
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default CustomSwitchGroup;
