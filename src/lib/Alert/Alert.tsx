import React from "react";
import clsx from "clsx";
import { AlertProps, AlertVariant } from "./Alert.types";
import "./Alert.scss";
import { Icon } from "../Icon";

/**
 * A stylized Code4rena alert for displaying important messages to users on the front-end.
 * This component has 4 available variants and support for including `redirectUrl` & `redirectLabel` props
 * for scenarios where redirection to another page is necessary.
 *
 * __Available variants:__
 * - `INFO`
 * - `MUTED`
 * - `WARNING`
 * - `ERROR`
 *
 * @param title - Small, emphasized message descriptor.
 * @param message - Main alert message.
 * @param redirectLabel - Anchor tag label for the provided `redirectUrl` prop.
 * @param redirectUrl - Relative path or absolute url to be navigated to.
 * @param variant - Style variant to be applied to rendered component.
 * @param className - String of custom classes to extend the default styling of the component.
 * @param id - HTML element identifier
 */
export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  redirectLabel,
  redirectUrl,
  variant,
  className,
  id,
}) => {
  const styling = clsx({
    c4alert: true,
    "alert--info": variant === AlertVariant.INFO,
    "alert--muted": variant === AlertVariant.MUTED,
    "alert--warning": variant === AlertVariant.WARNING,
    "alert--error": variant === AlertVariant.ERROR,
  });

  return (
    <div id={id} className={`${styling} ${className}`} role="alert">
      {(variant === AlertVariant.WARNING || variant === AlertVariant.ERROR) && (
        <div className="alert--icon">
          {variant === AlertVariant.WARNING 
            ? <Icon name="warning" size="large" color="#ffec91" />
            : <Icon name="x" size="large" color="#ff427b" />  
          }
        </div>
      )}
      <div className="alert--content">
        {title && <strong>{title}</strong>} {message && <p>{message}</p>}{" "}
        {redirectUrl && (
          <a
            aria-label={`${
              redirectLabel
                ? `${redirectLabel} (opens in new window)`
                : "Read more on this alert (opens in new window)"
            }`}
            href={redirectUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {redirectLabel ? redirectLabel : "Read more on this alert"}
          </a>
        )}
      </div>
    </div>
  );
};

Alert.defaultProps = {
  title: "",
  redirectLabel: "",
  redirectUrl: "",
  /* @ts-ignore value in Enum */
  variant: "INFO",
  className: "",
  id: "",
};
