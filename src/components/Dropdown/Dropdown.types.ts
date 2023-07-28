import { ReactNode } from "react";

export interface DropdownProps {
  /** HTML element identifier */
  id?: string;
  /** Custom classname(s) for the rendered component's wrapping div element. */
  wrapperClass?: string;
  /** Custom classname(s) for the rendered component's trigger button. */
  triggerButtonClass?: string;
  /** Determines whether the dropdown should be displayed on hovering the triggger button. */
  openOnHover?: boolean;
  /** Child to be wrapped by the trigger button. Can be a text label or a React node such as an image, svg, etc. */
  triggerButton: string | ReactNode;
  /** Optional accessibility label for the dropdown's trigger button. */
  triggerAriaLabel?: string;
  /** Boolean determining whether the arrow indicator icon is present or not. */
  hideDownArrow?: boolean;
  /** Elements to be rendered inside the dropdown. Child elements with the className `c4dropdown--button` will take on the default styling provided by the component. */
  children: ReactNode;
}

export interface DropdownLink {
  /** Display text for the button/link. */
  label: string;
  /** Absolute URL or relative path to redirect to. */
  href: string;
  /** Boolean indicating whether href is to an external site or not (opens in new window if true). */
  external?: boolean;
  /** Optional accessibility label for the rendered anchor tag.  */
  ariaLabel?: string;
}
