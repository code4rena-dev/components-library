import React from "react";
import { Switch } from "./Switch";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Switch",
  tags: ["autodocs"],
  argTypes: {
    onChange: {
      control: "function",
      action: "onChange",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const SampleComponent: Story = (args) => {
  const [_, updateArgs] = useArgs();

  return (
    <Switch
      {...args}
      onChange={(e) => {
        args.onChange();
        updateArgs({ value: e.currentTarget.checked });
      }}
    />
  );
};
SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
  },
};
SampleComponent.args = {
  id: "",
  className: "",
  value: true,
  ariaLabel: "Marketing emails",
};
