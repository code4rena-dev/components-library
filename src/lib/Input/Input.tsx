import clsx from "clsx";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import {
  CustomArgs,
  InputArgs,
  InputProps,
  InputVariant,
  SelectOption,
} from "./Input.types";
import "./Input.scss";

const mappedTypes = (
  inputType: InputVariant,
  inputArgs: InputArgs,
  customArgs?: CustomArgs
) => {
  switch (inputType) {
    case InputVariant.FIELD:
      return <input {...inputArgs} />;
    case InputVariant.TEXTAREA:
      return <textarea {...inputArgs} />;
    case InputVariant.SELECT:
      return (
        customArgs?.selectOptions != null && (
          <Select
            {...inputArgs}
            classNamePrefix="c4input--reactselect"
            isDisabled={inputArgs.disabled ?? false}
            blurInputOnSelect={false}
            closeMenuOnSelect={!customArgs.isMulti}
            onChange={customArgs.handleChange}
            isMulti={customArgs.isMulti ?? false}
            value={
              customArgs?.isMulti
                ? customArgs.selectValue
                : customArgs.selectOptions?.find(
                    (o: SelectOption) => o.value === customArgs?.selectValue
                  ) || {
                    label: inputArgs.placeholder ?? "Select...",
                    value: "",
                  }
            }
            options={customArgs.selectOptions}
          />
        )
      );
  }
};

/**
 * A stylized Code4rena input component with 3 available variants. The component has default support for **required** field validation
 * by default (when the `required` prop is provided). Validations can be further extended by passing a validation function to the `validator` prop.
 *
 * __Available variants:__
 * - `FIELD`
 * - `TEXTAREA`
 * - `SELECT`
 *
 * @param disabled - Boolean determining whether the input field is disabled or not.
 * @param fieldType - (FIELD variant only) Corresponds to the HTML Input Types. Determines the type of field to be rendered (i.e. 'text', 'password', 'email', etc)
 * @param forceValidation - Boolean determining whether field validation is to happen immediately or not.
 * @param helpText - Small helper text displayed below the input field label when provided. Can either be a string or JSX.
 * @param inputId - Required string identifier for the input field. Helps to separate fields in a form and facilitates targeting specific form inputs.
 * @param isMultiSelect - (SELECT variant only) Boolean determining whether the select field should allow selecting multiple options or not.
 * @param label - A label to define the purpose of the input field.
 * @param maxLength - A numerical value for definining the maximum allowed character count for the input field.
 * @param onChange - Event handler for changes to the selected input field type. Ideal place for setting the value of the input field to state.
 * @param placeholder - A placeholder message to be displayed in the absence of a field value.
 * @param required - Boolean indicating whether the input field is required or optional. Will trigger the appropriate validation during the field validation phase.
 * @param selectOptions - (SELECT variant only) An array of options to be displayed in the select field dropdown. Option should be of the form `{ label: string, value: string }`.
 * @param selectValue - (SELECT variant only) - Current value of select field tracked by state.
 * @param variant - Value determining the type of input field to be rendered.
 * @param validator - A custom function for running additional validation on an input value. Should return an array of error messages (if any).
 * @param value - Current value of input field as tracked by state. This does not apply to the SELECT field variant (please see the `selectValue` parameter).
 */
export const Input: React.FC<InputProps> = ({
  inputId,
  fieldType = "text",
  isMultiSelect = false,
  variant = InputVariant.FIELD,
  required = false,
  label,
  helpText,
  disabled = false,
  maxLength,
  placeholder,
  selectValue,
  forceValidation = false,
  selectOptions,
  validator,
  value,
  onChange,
}) => {
  const fieldTypeClassName = clsx({
    c4input: true,
    "c4input--field": variant === InputVariant.FIELD,
    "c4input--textarea": variant === InputVariant.TEXTAREA,
    "c4input--select": variant === InputVariant.SELECT,
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    (string | ReactNode)[]
  >([]);

  const validate = (): (string | ReactNode)[] => {
    let errorMessages: (string | ReactNode)[] = [];
    if (validator) {
      const validationErrors = validator(value);
      if (validationErrors.length > 0) {
        errorMessages = errorMessages.concat(validationErrors);
      }
    }
    if (required) {
      console.log(selectValue);

      if (variant !== InputVariant.SELECT && (value === "" || value == null)) {
        errorMessages.push("This field is required");
      } else if (
        (variant === InputVariant.SELECT &&
          !isMultiSelect &&
          (selectValue === "" ||
            selectValue == null ||
            Array.isArray(selectValue))) ||
        (isMultiSelect &&
          (!Array.isArray(selectValue) || selectValue.length === 0))
      ) {
        errorMessages.push("This field is required");
      }
    }
    if (errorMessages.length > 0) {
      setIsInvalid(true);
      setValidationErrors(errorMessages);
    } else {
      setIsInvalid(false);
      setValidationErrors([]);
    }
    return errorMessages;
  };

  useEffect(() => {
    if (forceValidation) {
      validate();
    }
  }, [forceValidation]);

  // Arguments provided to all input field types
  const controlArgs = {
    className: clsx("c4input--control", isInvalid && "c4input--control--error"),
    name: inputId,
    id: inputId,
    "aria-describedby": isInvalid
      ? `${inputId}--error`
      : helpText != null
      ? `${inputId}--help`
      : undefined,
    placeholder: placeholder || "",
    value: value,
    autoComplete: "off",
    onBlur: validate,
    onChange: onChange,
    maxLength: maxLength,
    type: fieldType,
    disabled: disabled ?? false,
  };

  // Additional arguments which are specific to the select input type
  // (Select input built from react-select library)
  const customArgs = selectOptions
    ? {
        isMulti: isMultiSelect,
        selectOptions: selectOptions,
        selectValue: selectValue,
        handleChange: useCallback(
          (
            option:
              | SingleValue<string | number | SelectOption>
              | MultiValue<string | number | SelectOption>
          ) => {
            const value =
              option && option.hasOwnProperty("value")
                ? (option as SelectOption).value
                : "";
            const target: {
              value: MultiValue<SelectOption> | string;
              name: string;
            } = {
              name: inputId,
              value: isMultiSelect
                ? (option as MultiValue<SelectOption>)
                : (value as string),
            };
            // @ts-ignore
            onChange({ target });
          },
          [onChange, inputId, isMultiSelect]
        ),
      }
    : undefined;

  return (
    <fieldset className={fieldTypeClassName}>
      {label && (
        <label className="c4input--label" htmlFor={inputId}>
          {required ? label + " *" : label}
        </label>
      )}
      {helpText &&
        (typeof helpText === "string" ? (
          <p id={`${inputId}--help`} className="c4input--help">
            {helpText}
          </p>
        ) : (
          <div className="c4input--help">{helpText}</div>
        ))}
      <div className="c4input--wrapper">
        {mappedTypes(
          variant ?? InputVariant.FIELD,
          controlArgs,
          variant === InputVariant.SELECT ? customArgs : undefined
        )}
      </div>
      {isInvalid &&
        validationErrors.map((validationError, idx) => (
          <div
            key={`error-${idx + 1}`}
            id={inputId + "--error"}
            className="c4input--error"
          >
            {validationError}
          </div>
        ))}
    </fieldset>
  );
};
