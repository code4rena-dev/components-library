import React from "react";
import { ContestStatus } from "./ContestStatus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ContestStatus> = {
  component: ContestStatus,
  title: "Contest Status",
  tags: ["autodocs"],
  argTypes: {
    status: { control: "select" },
  },
};
export default meta;

type Story = StoryObj<typeof ContestStatus>;

export const SampleComponent: Story = (args) => <ContestStatus {...args} />;
SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
  },
};
SampleComponent.args = {
  status: "LIVE",
  className: "",
  id: "",
};
