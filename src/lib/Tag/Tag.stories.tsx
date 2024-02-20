import React from "react";
import { Tag } from "./Tag";
import { Icon } from "../Icon";
import { Meta, StoryObj } from "@storybook/react";
import { TagSize, TagVariant } from "./Tag.types";

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: "Components/Tag",
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select" },
    size: { control: "select" },
    iconLeft: { 
      control: "select",
      options: ["None", "Image Url", "Icon"],
      mapping: {
        "None": undefined,
        "Image Url": '/icons/wolfbot.svg',
        "Icon": <Icon name="lock" size="medium" color="white" />
      },
    }
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
  size: TagSize.NARROW,
  className: "",
  id: "",
  iconLeft: undefined
};
