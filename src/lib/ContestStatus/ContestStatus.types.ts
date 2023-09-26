export type Status = "UPCOMING" | "LIVE" | "ENDED";

export interface ContestStatusProps {
  /** Status indicator for the current contest. */
  status?: Status;
  /** String of custom classes to extend the default styling of the component. */
  className?: string;
  /** HTML element identifier */
  id?: string;
}
