export enum AlertVariant {
  INFO = "INFO",
  MUTED = "MUTED",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export interface AlertProps {
  /** Small, emphasized message descriptor. */
  title?: string;
  /** Main alert message */
  message: string;
  /** Anchor tag label for the provided `redirectUrl` prop. */
  redirectLabel?: string;
  /** Relative path or absolute url to be navigated to. */
  redirectUrl?: string;
  /** Style variant to be applied to rendered component. */
  variant?: AlertVariant;
  /** String of custom classes to extend the default styling of the component. */
  className?: string;
  /** Element identifier */
  id?: string;
}
