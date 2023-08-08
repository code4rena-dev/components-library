import React from "react";
import { EyebrowBar } from "./EyebrowBar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EyebrowBar> = {
  component: EyebrowBar,
  title: "Eyebrow Bar",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof EyebrowBar>;

export const SampleComponent: Story = (args) => <EyebrowBar {...args} />;

SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
  },
};
SampleComponent.args = {
  external: false,
  href: "/how-it-works/wardens",
  text: "Introducing Code4rena Profiles: a solo auditor's highlight reel.",
};
