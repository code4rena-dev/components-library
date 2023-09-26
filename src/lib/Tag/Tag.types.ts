export type TagVariant =
  | "WHITE"
  | "DEFAULT"
  | "BLURPLE"
  | "RED"
  | "YELLOW"
  | "WHITE_OUTLINE";
export type TagSize = "NARROW" | "WIDE";

export interface TagProps {
  /**  Style variant to be applied to rendered component */
  variant?: TagVariant;
  /** Standard button size options */
  size?: TagSize;
  /** Relative path or absolute url to an icon/image. Renders icon to the left of label */
  iconLeft?: string;
  /** Label to be attached to the tag */
  label: string;
  /** String of custom classes to extend the default styling of the component. */
  className?: string;
  /** HTML element identifier */
  id?: string;
}
