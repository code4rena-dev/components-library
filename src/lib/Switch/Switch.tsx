import React from "react";
import clsx from "clsx";
import { SwitchProps } from "./Switch.types";
import "./Switch.scss";

/**
 * A simple and stylized Code4rena switch component for handling binary input selections.
 * Under the hood, this Switch component is an `input[type="checkbox"]` with the appropriate accessibility properties.
 *
 * @param ariaLabel - Accessibility label for the Switch component.
 * @param className - Additional classname(s) for the component to allow for customized styling.
 * @param id - HTML identifier for the component.
 * @param onChange - Function to be triggered on changes to the value of the component. Appropriate for setting state.
 * @param value - Boolean representing the checked/unchecked value of the Switch
 */
export const Switch: React.FC<SwitchProps> = ({
  id,
  className,
  ariaLabel,
  value,
  onChange,
}) => {
  return (
    <label className="c4toggle">
      <input
        id={id}
        role="switch"
        aria-label={ariaLabel}
        checked={value}
        onChange={(e) => onChange(e)}
        className={clsx(className, value ? "c4toggle--on" : "c4toggle--off")}
        type="checkbox"
      />
      <span className="c4toggle--slider" />
    </label>
  );
};
