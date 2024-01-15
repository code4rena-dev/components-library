import { ChangeEvent, ReactNode } from "react";
import { MultiValue, SingleValue } from "react-select";

export enum InputVariant {
  FIELD = "FIELD",
  TEXTAREA = "TEXTAREA",
  SELECT = "SELECT",
}

export type SelectOption = {
  label: string;
  value: string | number;
  image?: unknown;
};

export type InputArgs = {
  className: string;
  name: string;
  id: string;
  "aria-describedby": string | undefined;
  placeholder: string;
  value: string;
  autoComplete: string;
  onBlur: () => (string | ReactNode)[];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxLength?: number;
  type?: string;
  disabled: boolean;
};

export type CustomArgs = {
  isMulti?: boolean;
  selectOptions: SelectOption[];
  selectValue?: string | number;
  handleChange: (
    option:
      | SingleValue<string | number | SelectOption>
      | MultiValue<string | number | SelectOption>
  ) => void;
};

export interface InputProps {
  /** Boolean determining whether the input field is disabled or not. */
  disabled?: boolean;
  /** (FIELD variant only) Corresponds to the HTML Input Types. Determines the type of field to be rendered (i.e. 'text', 'password', 'email', etc) */
  fieldType?:
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  /** Boolean determining whether field validation is to happen immediately or not. */
  forceValidation?: boolean;
  /** Small helper text displayed below the input field label when provided. Can either be a string or JSX. */
  helpText?: string | ReactNode;
  /** Required string identifier for the input field. Helps to separate fields in a form and facilitates targeting specific form inputs. */
  inputId: string;
  /** (SELECT variant only) Boolean determining whether the select field should allow selecting multiple options or not. */
  isMultiSelect?: boolean;
  /** A label to define the purpose of the input field. */
  label?: string;
  /** A numerical value for definining the maximum allowed character count for the input field. */
  maxLength?: number;
  /** Event handler for changes to the selected input field type. Ideal place for setting the value of the input field to state. */
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** A placeholder message to be displayed in the absence of a field value. */
  placeholder?: string;
  /** Boolean indicating whether the input field is required or optional. Will trigger the appropriate validation during the field validation phase. */
  required?: boolean;
  /** (SELECT variant only) An array of options to be displayed in the select field dropdown. Option should be of the form `{ label: string, value: string }`. */
  selectOptions?: SelectOption[];
  /** (SELECT variant only) - Current value of select field tracked by state. */
  selectValue?: string | number;
  /** Value determining the type of input field to be rendered. */
  variant: InputVariant;
  /** A custom function for running additional validation on an input value. Should return an array of error messages (if any). */
  validator?: (value: string | number | undefined) => (string | ReactNode)[];
  /** Current value of input field as tracked by state. This does not apply to the SELECT field variant (please see the `selectValue` parameter). */
  value?: string;
}
