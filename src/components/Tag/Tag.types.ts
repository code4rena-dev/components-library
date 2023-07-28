export enum TagVariant {
  WHITE = "WHITE",
  DEFAULT = "DEFAULT",
  BLURPLE = "BLURPLE",
  RED = "RED",
  YELLOW = "YELLOW",
  WHITE_OUTLINE = "WHITE-OUTLINE",
}

export enum TagSize {
  NARROW = "NARROW",
  WIDE = "WIDE",
}

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
