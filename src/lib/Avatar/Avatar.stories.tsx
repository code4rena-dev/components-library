import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Avatar",
  argTypes: {
    size: { control: "number" },
    round: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const ImageAvatar: Story = (args) => <Avatar {...args} />;
ImageAvatar.args = {
  imgElement: <img src="/images/default-avatar.png" alt="Placeholder" />,
  name: "0xJohnWithALongName",
  size: 50,
  round: 25,
};

export const InitialsAvatar: Story = (args) => <Avatar {...args} />;
InitialsAvatar.args = {
  name: "John-With-A-Long-Name",
  size: 50,
  round: 25,
};
