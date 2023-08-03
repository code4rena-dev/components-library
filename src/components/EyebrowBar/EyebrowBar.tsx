import React from "react";
import { EyebrowBarProps } from "./EyebrowBar.types";
import "./EyebrowBar.scss";

/**
 *
 * @param buttonLabel - Display label for the bar's redirect button.
 * @param className - String of custom classes to extend the default styling of the component.
 * @param external - Boolean determining whether the redirect button leads to an external (opens in new tab) or internal page (opens on the same page).
 * @param href - Absolute URL or relative path for page to be redirected to onClick of the component's button.
 * @param id - HTML element identifier.
 * @param text - Main text displayed in the component.
 */
const EyebrowBar: React.FC<EyebrowBarProps> = ({
  buttonLabel,
  className,
  external,
  href,
  id,
  text,
}) => {
  return (
    <div id={id} className={`eyebrowbar ${className ?? ""}`}>
      <p className="eyebrowbar--content">
        {text}
        {href && buttonLabel && (
          <a
            aria-label={
              external ? `${buttonLabel} (opens in new window)` : buttonLabel
            }
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className="eyebrowbar--button"
          >
            {buttonLabel}
          </a>
        )}
      </p>
    </div>
  );
};

EyebrowBar.defaultProps = {
  buttonLabel: "Learn more",
  className: undefined,
  external: false,
  href: undefined,
  id: undefined,
};

export default EyebrowBar;
