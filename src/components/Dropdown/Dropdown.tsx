import React, { useState } from "react";
import clsx from "clsx";
import { DropdownProps } from "./Dropdown.types";
import "./Dropdown.scss";

/**
 * Dropdown component to display additional options either onHover or onClick (depending on the `onHover` prop) of the button generated from the `triggerButton` prop.
 *
 * @param wrapperClass - Additional classes for the dropdown's wrapping div element.
 * @param triggerButtonClass - Additional classes for the dropdown's triggering button.
 * @param openOnHover - Boolean indicating whether or not hovering the trigger button will display the dropdown.
 * @param triggerButton - Children to be wrapped by a `button` element.
 * @param triggerAriaLabel - Accessibility label for the dropdown's trigger button.
 * @param hideDownArrow - Boolean indicating whether or not an arrow indicator should be displayed on the trigger button.
 * @param children - Children to be displayed inside the dropdown.
 */
const Dropdown = ({
  id,
  wrapperClass,
  triggerButtonClass,
  openOnHover,
  triggerButton,
  triggerAriaLabel,
  hideDownArrow,
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id={id ? id : undefined}
      onMouseEnter={openOnHover ? () => setIsOpen(true) : undefined}
      onMouseLeave={openOnHover ? () => setIsOpen(false) : undefined}
      className={clsx("c4dropdown", wrapperClass && wrapperClass)}
    >
      <button
        aria-label={triggerAriaLabel ?? undefined}
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={() => setIsOpen(!isOpen)}
        className={clsx(
          "c4dropdown--trigger",
          triggerButtonClass && triggerButtonClass
        )}
      >
        {triggerButton}
        {!hideDownArrow && (
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className={clsx("c4dropdown--icon", isOpen && "c4dropdown--open")}
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        )}
      </button>
      <div
        className={clsx(
          isOpen && "c4dropdown--open",
          "c4dropdown--listcontainer"
        )}
      >
        <div className={"c4dropdown--list"}>{children}</div>
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  wrapperClass: "",
  triggerButtonClass: "",
  triggerAriaLabel: "See more options",
  openOnHover: true,
  hideDownArrow: false,
};

export default Dropdown;
