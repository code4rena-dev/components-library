import React, { Fragment } from "react";
import { ContestTile } from "./ContestTile";
import { Meta, StoryObj } from "@storybook/react";
import { ContestTileVariant } from "./ContestTile.types";

const meta: Meta<typeof ContestTile> = {
  component: ContestTile,
  title: "Components/Contest Tile",
  tags: ["autodocs"],
  argTypes: {
    contestData: {
      control: {
        type: 'object'
      }
    },
    bountyData: {
      control: {
        type: 'object'
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof ContestTile>;
const parameters = {
  layout: "fullscreen",
  docs: {
    canvas: { sourceState: "shown" },
    story: { height: "450px" },
  },
};


export const ContestTileComponent: Story = (args) => {
  const isDark = args.variant === ContestTileVariant.DARK || args.variant === ContestTileVariant.COMPACT_DARK;

  return <Fragment>
    <ContestTile
      {...args}
      variant={isDark ? ContestTileVariant.DARK : ContestTileVariant.LIGHT}
      startDate={new Date(args.contestData.startDate).toISOString()}
      endDate={new Date(args.contestData.endDate).toISOString()}
    />
    <ContestTile
      {...args}
      variant={isDark ? ContestTileVariant.COMPACT_DARK : ContestTileVariant.COMPACT_LIGHT }
      startDate={new Date(args.contestData.startDate).toISOString()}
      endDate={new Date(args.contestData.endDate).toISOString()}
    />
  </Fragment>
};

export const BountyTileComponent: Story = (args) => {
  const isDark = args.variant === ContestTileVariant.DARK || args.variant === ContestTileVariant.COMPACT_DARK;

  return <Fragment>
    <ContestTile {...args}
      variant={isDark ? ContestTileVariant.DARK : ContestTileVariant.LIGHT}
      startDate={new Date(args.bountyData.startDate).toISOString()} />
    <ContestTile {...args}
      variant={isDark ? ContestTileVariant.COMPACT_DARK : ContestTileVariant.COMPACT_LIGHT }
      startDate={new Date(args.bountyData.startDate).toISOString()} />
  </Fragment>
}

ContestTileComponent.parameters = parameters;
BountyTileComponent.parameters = parameters;


ContestTileComponent.args = {
  htmlId: "",
  contestData: {
    codeAccess: "public",
    contestType: "Open Audit",
    isUserCertified: false,
    contestId: 321,
    contestUrl: "https://code4rena.com/audits/2023-07-axelar-network#top",
    contestRepo: "https://github.com/code-423n4/2023-07-axelar",
    findingsRepo: "https://github.com/code-423n4/2023-07-axelar",
    amount: "$80,000 USDC",
    startDate: "2023-07-12T18:00:00Z",
    endDate: "2023-07-21T18:00:00Z",
  },
  /** @ts-ignore */
  variant: "DARK",
  sponsorImage: "/logos/apple-touch-icon.png",
  sponsorUrl: "https://twitter.com/axelarcore",
  title: "Axelar Network",
  description: "Decentralized interoperability network.",
};

BountyTileComponent.args = {
  htmlId: "",
  bountyData: {
    amount: "$80,000 USDC",
    startDate: "2023-07-12T18:00:00Z",
    repoUrl: "https://github.com/code-423n4/2023-07-axelar",
    bountyUrl: "https://code4rena.com/audits/2023-07-axelar-network#top",
  },
  /** @ts-ignore */
  variant: "LIGHT",
  sponsorImage: "/logos/apple-touch-icon.png",
  sponsorUrl: "https://twitter.com/axelarcore",
  title: "Axelar Network",
  description: "Decentralized interoperability network."
}
