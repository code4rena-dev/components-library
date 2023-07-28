import { ReactNode } from "react";
import { Status } from "../ContestStatus/ContestStatus.types";

export enum ContestTileVariant {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface ContestTileProps {
  /** An html `id` for the contest tile's wrapping div. */
  htmlId?: string;
  /** Style variant to be applied to rendered component. */
  variant?: ContestTileVariant;
  /** String indicating required access for viewing contest. */
  codeAccess: string;
  /** Boolean indicating certification status of logged in user. Required for viewing certain contests. */
  isUserCertified: boolean;
  /** Unique numerical identifier for the current contest. */
  contestId: number;
  /** Image url for contest's sponsor. */
  sponsorImage?: string;
  /** External url to the sponsor's page (Twitter, etc.). */
  sponsorUrl?: string;
  /** Absolute url or relative path to the page of the current contest. */
  contestUrl: string;
  /** Absolute url to the contest's GitHub repository. */
  contestRepo: string;
  /** Absolute url to the contest's findings. */
  findingsRepo: string;
  /** Title for the current contest. */
  title: string;
  /** Description for the current contest. */
  description: string;
  /** Reward pool for the current contest. */
  amount: string;
  /** Date string for the current contest's start date. */
  startDate: string;
  /** Date string for the current contest's end date. */
  endDate: string;
  /** Callback function to be triggered on contest time/status changes. */
  updateContestStatus?: () => void;
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
  updateContestStatus: () => void;
}
