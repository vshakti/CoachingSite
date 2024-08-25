export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  PASSWORD_INPUT = "password",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  SWITCH = "switch",
  TEMPLATE_DAY = "templateDay",
  TEMPLATE_DAY_VARIABLES = "templateDayVaraibles",
}

export interface ShowToastParams {
  message: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "action";
}
