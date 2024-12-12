export interface IconProps {
    /** Icon name based on the available options. */
    name: string;
    /** One of three size options for the icon: small ("16px"), medium ("24px"), and large ("32px") */
    size?: IconSize;
    /** Color value to decorate the icon with. */
    color?: string;
    /** Custom classes to be attached to the icon. */
    className?: string;
}

export type IconSize = "small" | "medium" | "large" | "extra-large";