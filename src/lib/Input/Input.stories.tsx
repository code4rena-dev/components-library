import React, { useState } from "react";
import { Input } from "./Input";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { InputVariant } from "./Input.types";

const wrapperStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Input",
  tags: ["autodocs"],
  argTypes: {
    fieldType: {
      control: "select",
      if: { arg: "variant", eq: InputVariant.FIELD },
    },
    helpText: {
      options: ["ReactNode", "string"],
      mapping: {
        ReactNode: (
          <p>
            Help text generated from a{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://storybook.js.org/docs/react/writing-stories/args#mapping-to-complex-arg-values"
            >
              JSX
            </a>{" "}
            element.
          </p>
        ),
        string: "Help text generated from a normal string value",
      },
    },
    isMultiSelect: {
      if: { arg: "variant", eq: InputVariant.SELECT },
    },
    maxLength: {
      if: { arg: "variant", neq: InputVariant.SELECT },
    },
    onChange: {
      control: "function",
      action: "onChange",
    },
    selectValue: {
      control: "text",
      if: { arg: "variant", eq: InputVariant.SELECT },
    },
    value: {
      if: { arg: "variant", neq: InputVariant.SELECT },
    },
    variant: { control: "select" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const SampleComponent: Story = (storyArgs) => {
  const [_, updateArgs] = useArgs();

  return (
    <Input
      {...storyArgs}
      onChange={(e) => {
        storyArgs.onChange();
        if (storyArgs.variant !== InputVariant.SELECT) {
          updateArgs({ value: e.target.value });
        } else {
          updateArgs({ selectValue: e.target.value });
        }
      }}
    />
  );
};
SampleComponent.parameters = {
  docs: { canvas: { sourceState: "shown" } },
};
SampleComponent.args = {
  disabled: false,
  fieldType: "text",
  forceValidation: false,
  inputId: "sample_input",
  isMultiSelect: false,
  label: "Sample input",
  maxLength: 300,
  placeholder: "Name...",
  value: "John Doe",
  variant: InputVariant.FIELD,
  selectValue: "John Doe",
  required: true,
  selectOptions: [
    { label: "John", value: "John Doe" },
    { label: "Alice", value: "Alice in Chains" },
    { label: "Bob", value: "Bob Dylan" },
  ],
};

/**
 * Below is the default state of the Input component (`FIELD` variant).
 * It renders a stylized HTML input tag, which can be further extended through the `fieldType` prop to be compatible with the following HTML Input Types:
 *
 * **date**, **datetime-local**, **email**, **month**, **number**, **password**, **tel**, **text**, **time**, **url**, **week**
 *
 * For further info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
 */
export const InputField: Story = (storyArgs) => (
  <>
    {/* @ts-ignore */}
    <div style={wrapperStyle}>
      {/* No value input */}
      <Input
        {...storyArgs}
        inputId="input_placeholder_field"
        helpText="Empty field (placeholder)"
      />
      {/* input with value */}
      <Input
        {...storyArgs}
        inputId="input_filled_field"
        helpText="Filled out field"
        value="Bob"
      />
      {/* disabled input */}
      <Input
        {...storyArgs}
        inputId="input_disabled_field"
        helpText="Disabled field"
        disabled={true}
        value="Bob"
      />
      {/* input with error */}
      <Input
        {...storyArgs}
        inputId="input_error_field"
        helpText="Field with error"
        required={true}
        forceValidation={true}
        value=""
      />
    </div>
  </>
);
InputField.args = {
  fieldType: "text",
  label: "First name",
  helpText: "Help us be able to identify you",
  maxLength: 200,
  placeholder: "Theodore, Anthony...",
  required: false,
  variant: InputVariant.FIELD,
};
InputField.parameters = {
  controls: { hideNoControlsWarning: true, include: [] },
};

/**
 * Below is the default state of the Input component (`TEXTAREA` variant).
 * It renders a stylized HTML textarea tag for when longer text inputs are required.

 */
export const TextArea: Story = (storyArgs) => (
  <>
    {/* @ts-ignore */}
    <div style={wrapperStyle}>
      {/* No value input */}
      <Input
        {...storyArgs}
        inputId="textarea_placeholder_field"
        helpText="Empty text area (placeholder)"
      />
      {/* input with value */}
      <Input
        {...storyArgs}
        inputId="textarea_filled_field"
        helpText="Filled out text area"
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
      {/* disabled input */}
      <Input
        {...storyArgs}
        inputId="textarea_disabled_field"
        helpText="Disabled text area"
        disabled={true}
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
      {/* input with error */}
      <Input
        {...storyArgs}
        inputId="textarea_error_field"
        helpText="text area with error"
        required={true}
        forceValidation={true}
        value=""
      />
    </div>
  </>
);
TextArea.args = {
  label: "First name",
  helpText: "Help us be able to identify you",
  maxLength: 300,
  placeholder: "Theodore, Anthony...",
  required: false,
  variant: InputVariant.TEXTAREA,
};
TextArea.parameters = {
  controls: { hideNoControlsWarning: true, include: [] },
};

/**
 * Below is the default state of the Input component (`SELECT` variant).
 * It renders a stylized select dropdown for when we need to give users multiple options to select from.
 * The component also contains an **embedded search** which allows for filtering the dropdown options by clicking and typing inside the field.
 *
 * The component can be turned into a multi-select dropdown by providing the `isMultiSelect` prop to the component.
 */
export const Select: Story = (storyArgs) => (
  <>
    {/* @ts-ignore */}
    <div style={wrapperStyle}>
      {/* No value select */}
      <Input
        {...storyArgs}
        inputId="select_placeholder_field"
        helpText="Empty select (placeholder)"
      />
      {/* select with single value */}
      <Input
        {...storyArgs}
        inputId="select_filled_field"
        helpText="Select with single value"
        selectValue="Pat Benatar"
      />
      {/* select with multiple values */}
      <Input
        {...storyArgs}
        isMultiSelect
        inputId="select_filled_field"
        helpText="Select with multiple values"
        selectValue={[
          { label: "Joan", value: "Joan Jett" },
          { label: "Pat", value: "Pat Benatar" },
        ]}
      />
      {/* disabled single select */}
      <Input
        {...storyArgs}
        inputId="select_disabled_single"
        helpText="Disabled single select"
        disabled={true}
        selectValue="Bob Dylan"
      />
      {/* disabled multi-select */}
      <Input
        {...storyArgs}
        isMultiSelect
        inputId="select_disabled_multi"
        helpText="Disabled multi select"
        disabled={true}
        selectValue={[
          { label: "Joan", value: "Joan Jett" },
          { label: "Pat", value: "Pat Benatar" },
        ]}
      />
      {/* select with error */}
      <Input
        {...storyArgs}
        inputId="select_error_field"
        helpText="Select with error"
        required={true}
        forceValidation={true}
      />
    </div>
  </>
);
Select.args = {
  label: "First name",
  helpText: "Help us be able to identify you",
  placeholder: "Select name...",
  required: false,
  variant: InputVariant.SELECT,
  selectOptions: [
    { label: "Bob", value: "Bob Dylan" },
    { label: "John", value: "John Lennon" },
    { label: "Joan", value: "Joan Jett" },
    { label: "Pat", value: "Pat Benatar" },
  ],
};
Select.parameters = {
  controls: { hideNoControlsWarning: true, include: [] },
};
