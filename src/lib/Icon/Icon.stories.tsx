import React from "react";
import { Icon } from "./Icon";
import { Meta, StoryObj } from "@storybook/react";
import { icons } from "./iconList";

const allIcons = icons("24px", "black");

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Components/Icon",
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: Object.keys(allIcons) },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const SampleComponent: Story = (args) => <Icon {...args} />;
SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" }
  },
};
SampleComponent.args = {
  name: "heart",
  size: "medium",
  color: "white",
};
