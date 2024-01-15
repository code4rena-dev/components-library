import React from "react";
import clsx from "clsx";
import { ButtonProps, ButtonSize, ButtonType, ButtonVariant } from "./Button.types";
import "./Button.scss";

/**
 * A stylized Code4rena button that can be rendered in 2 forms with 2 available variants.
 * This component will either render as a **button tag** or an **anchor tag** depending on whether or not the `href` prop is provided.
 *
 * __Available variants:__
 * - `PRIMARY`
 * - `SECONDARY`
 *
 * @param label - Label to be attached to the button.
 * @param type - HTML button element type.
 * @param variant - Style variant to be applied to rendered component.
 * @param disabled - Triggers disabled state of a button when enabled. Does not apply to links.
 * @param iconLeft - Icon element to be rendered to the left of button text.
 * @param iconRight - Icon element to be rendered to the right of button text.
 * @param size - Standard button size options
 * @param href - __Transforms button into a link.__ Relative path (in-app navigation) or absolute url (external navigation) of location to navigate to.
 * @param external - Determines whether navigation should occur on the same page or in a new tab.
 * @param onClick - Function to be triggered on button click. Does not apply to links.
 * @param className - String of custom classes to extend the default styling of the component.
 * @param id - HTML element identifier.
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  type = ButtonType.BUTTON,
  variant = ButtonVariant.PRIMARY,
  external = false,
  disabled = false,
  iconLeft = undefined,
  iconRight = undefined,
  size = ButtonSize.NARROW,
  href = "",
  onClick,
  className = "",
  id = "",
}) => {
  const styling = clsx({
    c4button: true,
    "button--primary": variant === ButtonVariant.PRIMARY,
    "button--secondary": variant === ButtonVariant.SECONDARY,
    wide: size === ButtonSize.WIDE,
  });

  return href != null && href.length ? (
    <a
      aria-label={`${label}${external ? " (opens in new window)" : ""}`}
      id={id ?? undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      href={href}
      className={`${styling} ${className}`}
    >
      {/* If left icon exists */}
      {iconLeft}

      {label}
      
      {/* If right icon exists */}
      {iconRight}
    </a>
  ) : (
    <button
      id={id ?? undefined}
      role="button"
      aria-label={label}
      aria-disabled={disabled}
      type={type ?? "button"}
      className={`${styling} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* If left icon exists */}
      {iconLeft}

      {label}

      {/* If right icon exists */}
      {iconRight}
    </button>
  );
};
