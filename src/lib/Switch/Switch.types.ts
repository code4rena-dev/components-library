import { ChangeEvent } from "react";

export interface SwitchProps {
  /** Accessibility label for the Switch component. */
  ariaLabel: string;
  /** Additional classname(s) for the component to allow for customized styling. */
  className?: string;
  /** HTML identifier for the component. */
  id?: string;
  /** Function to be triggered on changes to the value of the component. Appropriate for setting state. */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Boolean representing the checked/unchecked value of the Switch */
  value: boolean;
}
