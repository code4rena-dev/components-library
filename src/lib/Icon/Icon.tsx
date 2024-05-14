import { IconProps } from "./Icon.types";
import { icons } from "./iconList";

const getIcon = (name: string, size: string, color: string, className?: string) => {
    const allIcons = icons(size, color, className);
    
    return allIcons[name];
}

/**
 * A Code4rena component for rendering any icon from the available Code4rena List.
 * For further details on all icon names, please visit the
 * [Icon Gallery](https://components-library-wine.vercel.app/?path=/docs/docs-iconography--docs)
 *
 * @param name - Icon name based on the available options.
 * @param size - One of three size options for the icon: small ("16px"), medium ("24px"), and large ("32px")
 * @param color - Color value to decorate the icon with.
 * @param className - Custom classes to be attached to the icon.
 */
export const Icon = ({
    name,
    size = "medium",
    color = "black",
    className
}: IconProps) => {
    let sizeInPx = "24px";

    switch (size) {
        case "small":
            sizeInPx = "16px";
            break;
        case "medium":
            sizeInPx = "24px";
            break;
        case "large":
            sizeInPx = "32px";
            break;
        default:
            sizeInPx = "24px";
    }

    return getIcon(name, sizeInPx, color, className);
}