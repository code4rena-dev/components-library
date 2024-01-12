import React, { Fragment } from "react";
import { ContestTile } from "./ContestTile";
import { Meta, StoryObj } from "@storybook/react";
import { ContestTileVariant } from "./ContestTile.types";

const meta: Meta<typeof ContestTile> = {
  component: ContestTile,
  title: "Contest Tile",
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

const defaultArgs = {
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
    startDate: "2030-07-12T18:00:00Z",
    endDate: "2030-07-21T18:00:00.000Z",
  },
  variant: ContestTileVariant.DARK,
  sponsorImage: "/logos/apple-touch-icon.png",
  sponsorUrl: "https://twitter.com/axelarcore",
  title: "Axelar Network",
  description: "Decentralized interoperability network.",
};

export const ContestTileUpcoming: Story = (args) => {
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

export const ContestTileLive: Story = (args) => {
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

export const ContestTileEnded: Story = (args) => {
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

export const BountyTile: Story = (args) => {
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

ContestTileUpcoming.parameters = parameters;
ContestTileLive.parameters = parameters;
ContestTileEnded.parameters = parameters;
BountyTile.parameters = parameters;

ContestTileUpcoming.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    startDate: "2030-07-12T18:00:00Z",
    endDate: "2030-07-21T18:00:00.000Z"
  }
};

ContestTileLive.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    startDate: "2023-07-12T18:00:00Z",
    endDate: "2030-07-21T18:00:00.000Z"
  }
};

ContestTileEnded.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    startDate: "2023-07-12T18:00:00Z",
    endDate: "2023-07-21T18:00:00Z"
  }
};

BountyTile.args = {
  htmlId: "",
  bountyData: {
    amount: "$80,000 USDC",
    startDate: "2023-07-12T18:00:00Z",
    repoUrl: "https://github.com/code-423n4/2023-07-axelar",
    bountyUrl: "https://code4rena.com/audits/2023-07-axelar-network#top",
  },
  variant: ContestTileVariant.LIGHT,
  sponsorImage: "/logos/apple-touch-icon.png",
  sponsorUrl: "https://twitter.com/axelarcore",
  title: "Axelar Network",
  description: "Decentralized interoperability network."
}
