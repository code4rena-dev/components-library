import React from "react";
import { Tag } from "./Tag";
import { Meta, StoryObj } from "@storybook/react";
import { TagSize, TagVariant } from "./Tag.types";

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: "Tag",
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select" },
    size: { control: "select" },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const SampleComponent: Story = (args) => <Tag {...args} />;
SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
  },
};
SampleComponent.args = {
  variant: TagVariant.DEFAULT,
  label: "Private",
  iconLeft: "/icons/lock.svg",
  size: TagSize.NARROW,
  className: "",
  id: "",
};
