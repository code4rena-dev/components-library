export enum Status {
  UPCOMING = "UPCOMING",
  LIVE = "LIVE",
  ENDED = "ENDED",
}

export interface ContestStatusProps {
  /** Status indicator for the current contest. */
  status?: Status;
  /** Audit status. */
  auditStatus?: AuditStatus | null;
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

export enum AuditPublicStage {
  Active = "Active",
  Upcoming = "Upcoming",
  SubsClosed = "Submissions closed",
  Completed = "Completed",
}

// Grouping mapping of the audit statuses to the public stages
export const MapAuditStatusToAuditPublicStage: Record<
  AuditStatus,
  AuditPublicStage | null
> = {
  [AuditStatus.PreAudit]: AuditPublicStage.Upcoming,
  [AuditStatus.Active]: AuditPublicStage.Active,
  [AuditStatus.Awarding]: AuditPublicStage.SubsClosed,
  [AuditStatus.Judging]: AuditPublicStage.SubsClosed,
  [AuditStatus.PJQA]: AuditPublicStage.SubsClosed,
  [AuditStatus.Reporting]: AuditPublicStage.SubsClosed,
  [AuditStatus.Review]: AuditPublicStage.SubsClosed,
  [AuditStatus.Triage]: AuditPublicStage.SubsClosed,
  [AuditStatus.Restricted]: AuditPublicStage.SubsClosed,
  [AuditStatus.JudgingComplete]: AuditPublicStage.SubsClosed,
  [AuditStatus.Paused]: AuditPublicStage.SubsClosed,
  [AuditStatus.Completed]: AuditPublicStage.Completed,
  // Excluded statuses:
  [AuditStatus.LostDeal]: null,
  [AuditStatus.Booking]: null,
};
