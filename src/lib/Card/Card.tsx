import clsx from "clsx";
import React from "react";
import { CardImageBorderRadius, CardImageSize, CardProps } from "./Card.types";
import { Button } from "../Button";
import { ButtonSize, ButtonType, ButtonVariant } from "../Button/Button.types";
import "./Card.scss";

export const Card: React.FC<CardProps> = ({
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
}) => {
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
            <p className="card__footer-details">{footerDetails}</p>
          )}
          {footerLinks && (
            <div className="card__footer-link-wrapper">
              {footerLinks.map((link) => link)}
            </div>
          )}
        </footer>
      )}
    </div>
  );
};
