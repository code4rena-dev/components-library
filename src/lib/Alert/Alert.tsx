import React from "react";
import clsx from "clsx";
import { AlertProps } from "./Alert.types";
import warningIcon from "../../../public/icons/warning.svg";
import deleteIcon from "../../../public/icons/delete.svg";
import "./Alert.scss";

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
    "alert--info": variant === "INFO",
    "alert--muted": variant === "MUTED",
    "alert--warning": variant === "WARNING",
    "alert--error": variant === "ERROR",
  });

  return (
    <div id={id} className={`${styling} ${className}`} role="alert">
      {(variant === "WARNING" || variant === "ERROR") && (
        <div className="alert--icon">
          <img
            alt={variant === "WARNING" ? "Warning" : "Error"}
            src={variant === "WARNING" ? warningIcon : deleteIcon}
            width={32}
            height={32}
          />
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
  variant: "INFO",
  className: "",
  id: "",
};
