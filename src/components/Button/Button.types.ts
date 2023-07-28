import { MouseEventHandler } from "react";

export enum ButtonVariant {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

export enum ButtonSize {
  NARROW = "NARROW",
  WIDE = "WIDE",
}

export interface ButtonProps {
  /** Label to be attached to the button. */
  label: string;
  /** HTML button element type */
  type?: ButtonType;
  /** Style variant to be applied to rendered component. */
  variant?: ButtonVariant;
  /** Triggers disabled state of a button when enabled. Does not apply to links. */
  disabled?: boolean;
  /** Relative path or absolute url to an icon/image. Renders icon to the left of label. */
  iconLeft?: string;
  /** Relative path or absolute url to an icon/image. Renders icon to the right of label. */
  iconRight?: string;
  /** Standard button size options */
  size?: ButtonSize;
  /** __Transforms button into a link.__ Relative path (in-app navigation) or absolute url (external navigation) of location to navigate to. */
  href?: string;
  /** Determines whether navigation should occur on the same page or in a new tab. */
  external?: boolean;
  /** Function to be triggered on button click. Does not apply to links. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** String of custom classes to extend the default styling of the component. */
  className?: string;
  /** HTML element identifier */
  id?: string;
}
