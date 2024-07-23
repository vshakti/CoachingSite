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
import { Input } from "@/components/ui/input";
import { FormFieldType } from "../forms/userForm";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  iconSrc?: React.ReactNode;

  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex h-8 items-center rounded-md border border-neutral-200 bg-white pl-2 ring-cyan-300 focus-within:ring-2 dark:bg-neutral-700">
          {iconSrc && (
            <div className="flex items-center justify-center">{iconSrc}</div>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="h-full border-0 focus:bg-none focus:outline-none dark:bg-neutral-700"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD_INPUT:
      return (
        <div className="flex h-8 items-center rounded-md border border-neutral-200 bg-white pl-2 ring-cyan-300 focus-within:ring-2 dark:bg-neutral-700">
          {iconSrc && (
            <div className="flex items-center justify-center">{iconSrc}</div>
          )}
          <FormControl>
            <Input
              type="password"
              placeholder={placeholder}
              {...field}
              className="h-full border-0 focus:bg-none focus:outline-none dark:bg-neutral-700"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            className="flex h-8 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-200"
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
          />
        </FormControl>
      );

    default:
      break;
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
