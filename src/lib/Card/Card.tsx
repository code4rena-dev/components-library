import clsx from "clsx";
import React, { Fragment } from "react";
import { CardImageBorderRadius, CardImageSize, CardProps } from "./Card.types";
import { Button } from "../Button";
import { ButtonSize, ButtonType, ButtonVariant } from "../Button/Button.types";
import "./Card.scss";

/**
 * A stylized Code4rena card with 4 variants and optional footer, cta button, and title.
 * Requires an image tag for the top left corner and children for the body.
 *
 * __Available variants:__
 * - `TRANSPARENT` - makes the background of the card transparent
 * - `OUTLINED` - adds border around the card
 * - `COMPACT` - displays the body below the image to allow the card to be more narrow
 * - `BOTTOM_ALIGNED` - makes the title and body bottom aligned instead of top aligned
 *
 * @param children - Elements to be rendered inside the body of the card, passed in as children.
 * @param className - String of custom classes to extend the default styling of the component.
 * @param variants - Array of style variants to be applied to the rendered component.
 * @param footerDetails - Informational content to be rendered on the left side of the footer.
 * @param footerLinks - Array of anchor elements to be rendered in the right side of the footer.
 * @param imageSize - The size of the image displayed in the top corner. Can be small, medium or large. Defaults to medium
 * @param image - Image element to be rendered in the top left corner
 * @param imageBorderRadius - Border radius of the image. Can be circle, small, medium, or large. Defaults to circle.
 * @param title - The title to be rendered at the top of the card body. Can be string or react node.
 * @param cta - A call to action button rendered in the top right corner. Includes text and an onClick handler.
 */
export const Card = ({
  children,
  className,
  variants,
  footerDetails,
  footerLinks,
  imageSize = CardImageSize.MEDIUM,
  image,
  imageBorderRadius = CardImageBorderRadius.CIRCLE,
  title,
  cta,
}: CardProps) => {
  return (
    <div
      className={clsx(
        "card",
        className && className,
        variants && variants.map((variant) => `card--${variant}`)
      )}
    >
      {/* Main section of card */}
      <div className="card__main">
        <div
          className={`card__image card__image--${imageSize} card__image--radius-${imageBorderRadius}`}
        >
          {image}
        </div>
        {/* body */}
        <div className="card__body">
          {title && <h2 className="card__title">{title}</h2>}
          {children}
        </div>
        {/* CTA */}
        {cta && (
          <Button
            className="card__cta"
            onClick={cta.onClick}
            label={cta.text}
            variant={ButtonVariant.SECONDARY}
            type={ButtonType.BUTTON}
            size={ButtonSize.NARROW}
          />
        )}
      </div>
      {/* Footer */}
      {(footerDetails || footerLinks) && (
        <footer className="card__footer">
          {footerDetails && (
            <div className="card__footer-details">{footerDetails}</div>
          )}
          {footerLinks && (
            <div className="card__footer-link-wrapper">
              {footerLinks.map((link, index) => (
                <Fragment key={index}>{link}</Fragment>
              ))}
            </div>
          )}
        </footer>
      )}
    </div>
  );
};
