import { ReactNode } from "react";
import { Status } from "../ContestStatus/ContestStatus.types";

export enum ContestTileVariant {
  LIGHT = "LIGHT",
  DARK = "DARK",
  COMPACT_LIGHT = "COMPACT_LIGHT",
  COMPACT_DARK = "COMPACT_DARK"
}

export type ContestEcosystem = "Algorand" | "Aptos" | "Blast" | "Cosmos" | "Ethereum" | "EVM" | "NEAR" | "Polkadot" | "Scroll" | "Sei" | "Solana" | "StarkNet" | "Stellar" | "Sui" | "Other";

export type CodingLanguage = "Cairo" | "GO" | "HUFF" | "Ink" | "Move" | "Noir" | "Other" | "Rain" | "Rust" | "Rust evm" | "Solidity" | "Vyper" | "Yui";

export interface ContestTileProps {
  /** An html `id` for the contest tile's wrapping div. */
  htmlId?: string;
  /** Style variant to be applied to rendered component. */
  variant?: ContestTileVariant;
  /** If tile being rendered is for a contest, this data object is required. */
  contestData?: ContestTileData;
  /** If tile being rendered is for a bounty, this data object is required. */
  bountyData?: BountyTileData;
  /** Image url for contest's sponsor. */
  sponsorImage?: string;
  /** External url to the sponsor's page (Twitter, etc.). */
  sponsorUrl?: string;
  /** Title for the current event. */
  title: string;
  /** Description for the current event. */
  description: string;
  /** Whether to hide the dropdown links. */
  hideDropdown?: boolean;
}

export interface BountyTileData {
  /** Max reward amount for the current bounty. */
  amount: string;
  /** Date string for the current bounty's start date. */
  startDate: string;
  /** Absolute url or relative path to the page of the current bounty. */
  bountyUrl: string;
  /** Absolute url to the bounty's source code. */
  repoUrl: string;
  /** Ecosystem being deployed to for the current contest. */
  ecosystem?: ContestEcosystem;
  /** Coding language for the current contest. */
  languages?: CodingLanguage[];
  /** Callback function to be triggered on bounty time/status changes. */
  updateBountyStatus?: () => void;
}

export interface ContestTileData {
  /** String indicating required access for viewing contest. */
  codeAccess: string;
  /** String indicating a specific categorization for the current contest. */
  contestType?: string;
  /** Unique numerical identifier for the current contest. */
  contestId: number;
  /** Absolute url or relative path to the page of the current contest. */
  contestUrl: string;
  /** Absolute url to the contest's GitHub repository. */
  contestRepo: string;
  /** Absolute url to the contest's findings. */
  findingsRepo: string;
  /** Absolute url to the contest's findings. */
  botFindingsRepo?: string;
  /** Ecosystem being deployed to for the current contest. */
  ecosystem?: ContestEcosystem;
  /** Coding language for the current contest. */
  languages?: CodingLanguage[];
  /** Reward pool for the current contest. */
  amount: string;
  /** Callback function to be triggered on contest time/status changes. */
  updateContestStatus?: () => void;
  /** Date string for the current contest's start date. */
  startDate: string;
  /** Date string for the current contest's end date. */
  endDate: string;
  /** Boolean indicating certification status of logged in user. Required for viewing certain contests. */
  isUserCertified: boolean;
}

export interface ContestSchedule {
  contestStatus?: Status;
  botRaceStatus?: Status;
  start: Date;
  end: Date;
  botRaceEnd: Date;
  formattedStart: string;
  formattedEnd: string;
  timeZone: string;
  formattedBotRaceEnd: string;
  formattedDuration: string;
}

export interface CountdownProps {
  start: string;
  end: string;
  text?: string | ReactNode;
  updateContestStatus?: () => void;
}
