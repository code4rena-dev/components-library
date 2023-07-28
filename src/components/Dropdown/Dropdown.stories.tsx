import React from "react";
import Dropdown from "./Dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "Dropdown",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const SampleComponent: Story = (args) => (
  <div style={{ minHeight: "200px" }}>
    <Dropdown {...args}>{args.children}</Dropdown>
  </div>
);

SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
  },
};
SampleComponent.args = {
  id: "",
  wrapperClass: "",
  triggerButtonClass: "",
  openOnHover: true,
  triggerAriaLabel: "See more options",
  hideDownArrow: true,
  triggerButton: (
    <img src="/icons/ellipsis.svg" alt="Options icon" width={32} height={32} />
  ),
  children: (
    <>
      <a
        href="https://www.google.com"
        target="_blank"
        rel="noreferrer noopener"
        className="c4dropdown--button"
        aria-label="Google (opens in new window)"
      >
        Google
      </a>
      <a href="/" aria-label="Test" className="c4dropdown--button">
        Test Link
      </a>
    </>
  ),
};
