import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Home } from "./Home";

const meta: Meta<typeof Home> = {
  component: Home,
  title: "Icons/Product Icons/Home Icon",
  tags: ["autodocs"],
  argTypes: {
    color: { control: { type: "color" } },
  },
};
export default meta;

type Story = StoryObj<typeof Home>;

export const SampleComponent: Story = (args) => <Home {...args} />;

SampleComponent.parameters = {
  layout: "fullscreen",
  docs: {
    canvas: { sourceState: "shown" },
    story: { height: "100px" },
  },
};

SampleComponent.args = {
  size: 24,
  strokeWidth: 2,
  color: "#fff",
};
