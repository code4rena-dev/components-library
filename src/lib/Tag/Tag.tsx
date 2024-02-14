import clsx from "clsx";
import React from "react";
import { TagProps, TagSize, TagVariant } from "./Tag.types";
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
 * @param iconLeft - Relative path/absolute url to an icon/image or a components-library Icon. Renders icon to the left of label.
 * @param className - String of custom classes to extend the default styling of the component.
 * @param id - HTML element identifier.
 */
export const Tag: React.FC<TagProps> = ({
  variant = TagVariant.DEFAULT,
  size = TagSize.NARROW,
  iconLeft = "",
  label,
  className = "",
  id = "",
}) => {
  const styling = clsx({
    c4tag: true,
    "tag--white": variant === TagVariant.WHITE,
    "tag--default": variant === TagVariant.DEFAULT,
    "tag--blurple": variant === TagVariant.BLURPLE,
    "tag--red": variant === TagVariant.RED,
    "tag--yellow": variant === TagVariant.YELLOW,
    "tag--white-outline": variant === TagVariant.WHITE_OUTLINE,
    wide: size === TagSize.WIDE,
  });

  return (
    <div id={id ?? undefined} className={`${styling} ${className}`}>
      {iconLeft && typeof iconLeft === "string" && <img alt="" src={iconLeft} width={16} height={16} />}
      {iconLeft && typeof iconLeft !== "string" && <div className="icon">
        {iconLeft}
      </div>}
      {iconLeft && <div className="separator" />}
      <p className={iconLeft ? "has-icon" : undefined}>{label}</p>
    </div>
  );
};
