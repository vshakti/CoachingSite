"use client";

import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormFieldType } from "@/lib/exports/exports";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import { CalendarDaysIcon } from "lucide-react";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  iconSrc?: React.ReactNode;
  value?: string | number | boolean | object;
  type?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className?: string;

  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, placeholder, value, type, onChange, className } =
    props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex h-8 items-center rounded-md border border-slate-700 bg-slate-950 p-2 pl-2 text-white ring-cyan-500 ring-offset-0 focus-within:ring-1">
          {iconSrc && (
            <div className="flex items-center justify-center">{iconSrc}</div>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="h-full border-0 bg-transparent focus:bg-none focus:outline-none"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD_INPUT:
      return (
        <div className="flex h-8 items-center rounded-md border border-slate-700 bg-slate-950 p-2 pl-2 text-white ring-cyan-500 ring-offset-0 focus-within:ring-1">
          {iconSrc && (
            <div className="flex items-center justify-center">{iconSrc}</div>
          )}
          <FormControl>
            <Input
              type="password"
              placeholder={placeholder}
              {...field}
              className="h-full border-0 bg-transparent text-white focus:bg-none focus:outline-none"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEMPLATE_DAY:
      return (
        <div className="flex w-full items-end justify-end rounded-md text-white">
          {iconSrc && (
            <div className="flex items-center justify-center">{iconSrc}</div>
          )}
          <FormControl>
            <Input
              onChange={onChange}
              type={JSON.stringify(type)}
              value={value}
              placeholder={placeholder}
              {...field}
              className="h-full border-0 bg-transparent text-base focus:bg-none focus:outline-none"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            className="flex h-8 items-center rounded-md border border-slate-700 bg-slate-950 p-2 pl-2 text-white ring-cyan-500 ring-offset-0 focus-within:ring-1"
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
          />
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            className={`flex h-8 items-center rounded-md border bg-transparent p-2 pl-2 text-white ring-cyan-500 ring-offset-0 focus:ring-1 ${className} `}
            placeholder={props.placeholder}
            {...field}
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-2">
            <Checkbox
              className="flex h-6 w-6 items-center justify-center rounded-md border-input border-neutral-300 bg-background bg-neutral-100 p-2 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-500 dark:bg-neutral-800 dark:text-neutral-200"
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center rounded-md border border-slate-700 bg-slate-950 p-2 ring-cyan-500 ring-offset-0 focus-within:ring-1">
          <CalendarDaysIcon className="size-4 text-white" />
          <FormControl>
            <ReactDatePicker
              className="flex h-8 w-full items-center bg-slate-950 bg-transparent px-3 py-2 text-sm text-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | null) => {
                if (date) {
                  field.onChange(date);
                } else {
                  field.onChange(null);
                }
              }}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="flex h-8 w-full items-center rounded-md border border-input bg-background bg-slate-950 px-3 py-2 text-sm text-white ring-offset-0 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
