import React from "react";
import clsx from "clsx";
import { ButtonProps } from "./Button.types";
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
 * @param iconLeft - Relative path or absolute url to an icon/image. Renders icon to the left of label.
 * @param iconRight - Relative path or absolute url to an icon/image. Renders icon to the right of label.
 * @param size - Standard button size options
 * @param href - __Transforms button into a link.__ Relative path (in-app navigation) or absolute url (external navigation) of location to navigate to.
 * @param external - Determines whether navigation should occur on the same page or in a new tab.
 * @param onClick - Function to be triggered on button click. Does not apply to links.
 * @param className - String of custom classes to extend the default styling of the component.
 * @param id - HTML element identifier.
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  type,
  variant,
  external,
  disabled,
  iconLeft,
  iconRight,
  size,
  href,
  onClick,
  className,
  id,
}) => {
  const styling = clsx({
    c4button: true,
    "button--primary": variant === "PRIMARY",
    "button--secondary": variant === "SECONDARY",
    wide: size === "WIDE",
  });

  return href != null && href.length ? (
    <a
      aria-label={`${label}${external ? " (opens in new window)" : ""}`}
      id={id}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      href={href}
      className={`${styling} ${className}`}
    >
      {/* If passing a relative/absolute path as icon */}
      {iconLeft && <img alt="" src={iconLeft} width={16} height={16} />}
      {label}
      {/* If passing a relative/absolute path as icon */}
      {iconRight && <img alt="" src={iconRight} width={16} height={16} />}
    </a>
  ) : (
    <button
      id={id}
      role="button"
      aria-label={label}
      type={type}
      className={`${styling} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* If passing a relative/absolute path as icon */}
      {iconLeft && <img alt="" src={iconLeft} width={16} height={16} />}

      {label}
      {/* If passing a relative/absolute path as icon */}
      {iconRight && <img alt="" src={iconRight} width={16} height={16} />}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  variant: "PRIMARY",
  disabled: false,
  iconLeft: "",
  iconRight: "",
  size: "NARROW",
  href: "",
  external: false,
  onClick: undefined,
  className: "",
  id: "",
};
