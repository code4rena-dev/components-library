import React, { Fragment } from "react";
import { addDays, subDays } from "date-fns";
import { ContestTile } from "./ContestTile";
import { Meta, StoryObj } from "@storybook/react";
import { CodingLanguage, ContestEcosystem, ContestTileVariant } from "./ContestTile.types";
import { AuditStatus } from "../types";

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

const defaultArgs = {
  htmlId: "",
  contestData: {
    codeAccess: "public",
    cohorts: [],
    contestType: "Open Audit",
    isUserCertified: false,
    contestId: 321,
    ecosystem: "EVM" as ContestEcosystem,
    languages: ["Solidity"] as CodingLanguage[],
    contestUrl: "https://code4rena.com/audits/2023-07-axelar-network#top",
    contestRepo: "https://github.com/code-423n4/2023-07-axelar",
    findingsRepo: "https://github.com/code-423n4/2023-07-axelar",
    botFindingsRepo: "https://github.com/code-423n4/2023-07-axelar",
    amount: "$80,000 USDC",
    startDate: "2030-07-12T18:00:00Z",
    endDate: "2030-07-21T18:00:00.000Z",
  },
  variant: ContestTileVariant.DARK,
  sponsorImage: "./logos/apple-touch-icon.png",
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

export const ContestTileUpcomingRollingTriage: Story = (args) => {
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

export const ContestTileLiveCohort1: Story = (args) => {
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
export const ContestTileLivePreCohort2: Story = (args) => {
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
export const ContestTileLiveAwaitingCohort3: Story = (args) => {
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
ContestTileUpcomingRollingTriage.parameters = parameters;
ContestTileLive.parameters = parameters;
ContestTileLiveCohort1.parameters = parameters;
ContestTileLivePreCohort2.parameters = parameters;
ContestTileLiveAwaitingCohort3.parameters = parameters;
ContestTileEnded.parameters = parameters;
BountyTile.parameters = parameters;

ContestTileUpcoming.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    startDate: "2030-07-12T18:00:00Z",
    endDate: "2030-07-21T18:00:00.000Z",
    status: AuditStatus.PreAudit,
  }
};
ContestTileUpcomingRollingTriage.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    cohorts: [{
      name: "cohort-1",
      pauseTime: addDays(Date.now(), 6).toISOString(),
      resumeTime: null
    }, {
      name: "cohort-2",
      pauseTime: addDays(Date.now(), 13).toISOString(),
      resumeTime: addDays(Date.now(), 9).toISOString(),
    }, {
      name: "cohort-3",
      pauseTime: null,
      resumeTime: addDays(Date.now(), 16).toISOString(),
    }],
    startDate: addDays(Date.now(), 3).toISOString(),
    endDate: addDays(Date.now(), 20).toISOString(),
    status: AuditStatus.PreAudit,
  }
};


ContestTileLive.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    startDate: "2023-07-12T18:00:00Z",
    endDate: "2030-07-21T18:00:00.000Z",
    status: AuditStatus.Active,
  }
};
ContestTileLiveCohort1.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    cohorts: [{
      name: "cohort-1",
      pauseTime: addDays(Date.now(), 4).toISOString(),
      resumeTime: null
    }, {
      name: "cohort-2",
      pauseTime: addDays(Date.now(), 11).toISOString(),
      resumeTime: addDays(Date.now(), 7).toISOString(),
    }, {
      name: "cohort-3",
      pauseTime: null,
      resumeTime: addDays(Date.now(), 14).toISOString(),
    }],
    startDate: subDays(Date.now(), 1).toISOString(),
    endDate: addDays(Date.now(), 18).toISOString(),
    status: AuditStatus.Active,
  }
};
ContestTileLivePreCohort2.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    cohorts: [{
      name: "cohort-1",
      pauseTime: subDays(Date.now(), 1).toISOString(),
      resumeTime: null
    }, {
      name: "cohort-2",
      pauseTime: addDays(Date.now(), 6).toISOString(),
      resumeTime: addDays(Date.now(), 2).toISOString(),
    }, {
      name: "cohort-3",
      pauseTime: null,
      resumeTime: addDays(Date.now(), 9).toISOString(),
    }],
    startDate: subDays(Date.now(), 6).toISOString(),
    endDate: addDays(Date.now(), 16).toISOString(),
    status: AuditStatus.Paused,
  }
};
ContestTileLiveAwaitingCohort3.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    cohorts: [{
      name: "cohort-1",
      pauseTime: subDays(Date.now(), 11).toISOString(),
      resumeTime: null
    }, {
      name: "cohort-2",
      pauseTime: subDays(Date.now(), 4).toISOString(),
      resumeTime: subDays(Date.now(), 8).toISOString(),
    }, {
      name: "cohort-3",
      pauseTime: null,
      resumeTime: subDays(Date.now(), 1).toISOString(),
    }],
    startDate: subDays(Date.now(), 16).toISOString(),
    endDate: addDays(Date.now(), 6).toISOString(),
    status: AuditStatus.Paused,
  }
};

ContestTileEnded.args = {
  ...defaultArgs,
  contestData: {
    ...defaultArgs.contestData,
    startDate: "2023-07-12T18:00:00Z",
    endDate: "2023-07-21T18:00:00Z",
    status: AuditStatus.Review,
  }
};

BountyTile.args = {
  htmlId: "",
  bountyData: {
    amount: "$80,000 USDC",
    startDate: "2023-07-12T18:00:00Z",
    repoUrl: "https://github.com/code-423n4/2023-07-axelar",
    bountyUrl: "https://code4rena.com/audits/2023-07-axelar-network#top",
    ecosystem: "Polkadot" as ContestEcosystem,
    languages: ["Rust"] as CodingLanguage[],
  },
  variant: ContestTileVariant.LIGHT,
  sponsorImage: "./logos/apple-touch-icon.png",
  sponsorUrl: "https://twitter.com/axelarcore",
  title: "Axelar Network",
  description: "Decentralized interoperability network."
}
