import React from "react";
import ContestTile from "./ContestTile";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ContestTile> = {
  component: ContestTile,
  title: "Contest Tile",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ContestTile>;

export const SampleComponent: Story = (args) => (
  <ContestTile
    {...args}
    startDate={new Date(args.startDate).toISOString()}
    endDate={new Date(args.endDate).toISOString()}
  />
);
SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
    story: { height: "400px" },
  },
};
SampleComponent.args = {
  htmlId: "",
  codeAccess: "public",
  isUserCertified: false,
  /** @ts-ignore */
  variant: "DARK",
  contestId: 321,
  sponsorImage: "/logos/apple-touch-icon.png",
  sponsorUrl: "https://twitter.com/axelarcore",
  contestUrl: "https://code4rena.com/contests/2023-07-axelar-network#top",
  contestRepo: "https://github.com/code-423n4/2023-07-axelar",
  findingsRepo: "https://github.com/code-423n4/2023-07-axelar",
  title: "Axelar Network",
  description: "Decentralized interoperability network.",
  amount: "$80,000 USDC",
  startDate: "2023-07-12T18:00:00Z",
  endDate: "2023-07-21T18:00:00Z",
};
