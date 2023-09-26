import React from "react";
import { BlogPreview } from "./BlogPreview";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BlogPreview> = {
  component: BlogPreview,
  title: "Blog Post Preview",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof BlogPreview>;

export const SampleComponent: Story = (args) => {
  return <BlogPreview {...args} />;
};
SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
  },
};
SampleComponent.args = {
  imageDisplay: false,
  textDisplay: false,
  row: false,
  wide: false,
  border: false,
  link: "https://medium.com/code4rena/a-look-at-code4rena-audits-open-1a8e74e558c8",
  headline: "A look at Code4rena audits: Open",
  text: "Traditional audits take too much time and are limited in terms of talent and depth. Bug bounties don’t keep bugs out of production. That’s where Code4rena comes in",
  imageUrl:
    "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0AjtUFG6CotgJEFMzzt1uw.jpeg",
};
