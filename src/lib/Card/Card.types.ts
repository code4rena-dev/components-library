import { MouseEventHandler, ReactElement, ReactNode } from "react";

export enum CardVariant {
  TRANSPARENT = "transparent",
  OUTLINED = "outlined",
  COMPACT = "compact",
  BOTTOM_ALIGNED = "bottom-aligned",
}

export enum CardImageSize {
  LARGE = "l",
  MEDIUM = "m",
  SMALL = "s",
}

export enum CardImageBorderRadius {
  CIRCLE = "circle",
  LARGE = "l",
  MEDIUM = "m",
  SMALL = "s",
}

interface CardCTA {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface CardProps extends React.PropsWithChildren {
  /** String of custom classes to extend the default styling of the component. */
  className?: string;
  /** Style variant to be applied to rendered component. */
  variants?: CardVariant[];
  /** Informational content to be displayed in the footer. */
  footerDetails?: string | ReactNode;
  /** An array of links to be rendered in the footer of the card. */
  footerLinks?: ReactElement<HTMLAnchorElement>[];
  /** The size of the image displayed in the top left corner. Defaults to medium */
  imageSize: CardImageSize;
  /** The image to be displayed in the top left corner */
  image: ReactElement<HTMLImageElement>;
  /** Border radius of the image. Defaults to circle */
  imageBorderRadius?: CardImageBorderRadius;
  /** The title. Can be text or a react node */
  title?: string | ReactNode;
  /** A call to action. rendered in the top right corner */
  cta?: CardCTA;
}
