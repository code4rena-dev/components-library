import clsx from "clsx";
import React from "react";
import { TagProps } from "./Tag.types";
import "./Tag.scss";

/**
 * A stylized Code4rena tag with support for a left icon and 6 variants.
 *
 * __Available variants:__
 * - `WHITE`
 * - `DEFAULT`
 * - `BLURPLE`
 * - `RED`
 * - `YELLOW`
 * - `WHITE-OUTLINE`
 *
 * @param variant - Style variant to be applied to rendered component.
 * @param label - Label to be attached to the tag.
 * @param size - Standard button size options.
 * @param iconLeft - Relative path or absolute url to an icon/image. Renders icon to the left of label.
 * @param className - String of custom classes to extend the default styling of the component.
 * @param id - HTML element identifier.
 */
export const Tag: React.FC<TagProps> = ({
  variant,
  size,
  iconLeft,
  label,
  className,
  id,
}) => {
  const styling = clsx({
    c4tag: true,
    "tag--white": variant === "WHITE",
    "tag--default": variant === "DEFAULT",
    "tag--blurple": variant === "BLURPLE",
    "tag--red": variant === "RED",
    "tag--yellow": variant === "YELLOW",
    "tag--white-outline": variant === "WHITE_OUTLINE",
    wide: size === "WIDE",
  });

  return (
    <div id={id ?? undefined} className={`${styling} ${className}`}>
      {iconLeft && <img alt="" src={iconLeft} width={16} height={16} />}
      {label}
    </div>
  );
};

Tag.defaultProps = {
  variant: "DEFAULT",
  size: "NARROW",
  iconLeft: "",
  className: "",
  id: "",
};
