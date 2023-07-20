import React from "react";
import Alert from "./Alert";
import { Meta, StoryObj } from "@storybook/react";
import { AlertVariant } from "./Alert.types";

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Alert",
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select" },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const SampleComponent: Story = (args) => <Alert {...args} />;
SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
  },
};
SampleComponent.args = {
  variant: AlertVariant.INFO,
  title: "🤖 Text explaining the changes.",
  message:
    "The cyclone had set the house down, very gently—for a cyclone—in the midst of a country of marvelous beauty. There were lovely patches of green sward all about, with stately trees bearing rich and luscious fruits.",
  redirectLabel: "Green sward",
  redirectUrl: "https://google.com",
  className: "",
  id: "",
};
