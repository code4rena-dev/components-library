import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Card } from "./Card";
import {
  CardImageBorderRadius,
  CardImageSize,
  CardProps,
  CardVariant,
} from "./Card.types";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "Card",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const SampleComponent: Story = (args: CardProps) => {
  return <Card {...args} />;
};

SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
    story: { height: "500px" },
  },
};

SampleComponent.args = {
  children: <div style={{ width: "300px" }}>Team lead</div>,
  title: "MangoBurger",
  imageSize: CardImageSize.LARGE,
  image: <img src="/images/default-avatar.png" />,
  imageBorderRadius: CardImageBorderRadius.MEDIUM,
  cta: { text: "Follow", onClick: () => console.log("follow") },
  variants: [
    CardVariant.TRANSPARENT,
    CardVariant.OUTLINED,
    CardVariant.BOTTOM_ALIGNED,
  ],
  footerDetails: "Member since 9/24/2020",
  footerLinks: [<a href="/">Home</a>, <a href="/">View</a>],
};
