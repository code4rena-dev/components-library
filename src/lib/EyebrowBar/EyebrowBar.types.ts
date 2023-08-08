export interface EyebrowBarProps {
  /** Display label for the bar's redirect button. */
  buttonLabel?: string;
  /** String of custom classes to extend the default styling of the component. */
  className?: string;
  /** Boolean determining whether the redirect button leads to an external (opens in new tab) or internal page (opens on the same page). */
  external?: boolean;
  /** Absolute URL or relative path for page to be redirected to onClick of the component's button.  */
  href?: string;
  /** HTML element identifier. */
  id?: string;
  /** Main text displayed in the component. */
  text: string;
}
