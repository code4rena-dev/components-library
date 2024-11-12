export enum Status {
  UPCOMING = "UPCOMING",
  LIVE = "LIVE",
  ENDED = "ENDED",
}

export interface ContestStatusProps {
  /** Status indicator for the current contest. */
  status?: Status;
  /** String of custom classes to extend the default styling of the component. */
  className?: string;
  /** HTML element identifier */
  id?: string;
}

export const AuditStatus = {
  Booking: "Booking",
  PreAudit: "Pre-Audit",
  Active: "Active",
  /** Paused: The audit is in between Rolling Triage cohorts */
  Paused: "Paused",
  Triage: "Triage",
  Review: "Review",
  Restricted: "Restricted",
  Judging: "Judging",
  PJQA: "Post-Judging QA",
  JudgingComplete: "Judging Complete",
  Awarding: "Awarding",
  Reporting: "Reporting",
  Completed: "Completed",
  LostDeal: "Lost Deal",
} as const;
// Take the AuditStatus object, and make a string literal type of the values
export type AuditStatus = (typeof AuditStatus)[keyof typeof AuditStatus];
