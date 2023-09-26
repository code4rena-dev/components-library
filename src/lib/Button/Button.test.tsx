import React from "react";
import { Button } from "./Button";
import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonType } from "./Button.types";
import "@testing-library/jest-dom";

describe("========== C4 BUTTON - RUNNING TESTS ==========", () => {
  const role = "button";
  const defaultArgs = {
    label: "Sample Button",
    type: "button" as ButtonType,
  };

  test("Renders button with custom id and classNames", () => {
    const customClass = "custom-btn-1 custom-btn-2";
    const customId = "test_id";

    render(
      <Button
        {...defaultArgs}
        className={customClass}
        id={customId}
        type="reset"
      />
    );
    const button = screen.getByRole(role);
    expect(button).toHaveClass(customClass);
    expect(button).toHaveAttribute("id", customId);
  });

  test("Renders PRIMARY button", () => {
    render(<Button variant="PRIMARY" {...defaultArgs} />);
    const button = screen.getByRole(role);
    expect(button).toHaveClass("button--primary");
  });

  test("Renders SECONDARY button", () => {
    render(<Button variant="SECONDARY" {...defaultArgs} />);
    const button = screen.getByRole(role);
    expect(button).toHaveClass("button--secondary");
  });

  test("Correctly triggers onClick prop", () => {
    let count = 0;
    render(
      <Button
        {...defaultArgs}
        onClick={() => {
          count += 1;
        }}
      />
    );
    const button = screen.getByRole(role);
    fireEvent.click(button);
    expect(count).toBe(1);
  });

  test("Renders Disabled button", () => {
    let count = 0;
    render(
      <Button
        {...defaultArgs}
        onClick={() => {
          count += 1;
        }}
        disabled
      />
    );
    const button = screen.getByRole(role);
    expect(button).toHaveAttribute("disabled");
    // If button is disabled, onClick event shouldn't fire
    fireEvent.click(button);
    expect(count).toBe(0);
  });

  test("Renders button with icons", () => {
    render(
      <Button
        {...defaultArgs}
        iconRight="/icons/edit.svg"
        iconLeft="/icons/edit.svg"
      />
    );
    const button = screen.getByRole(role);
    const icons = button.getElementsByTagName("img");
    expect(icons.length).toBe(2);
  });

  test("Renders button in correct sizes", () => {
    // Buttons are narrow by default
    const { rerender } = render(<Button {...defaultArgs} />);
    const button1 = screen.getByRole(role);
    expect(button1).not.toHaveClass("wide");
    rerender(<Button {...defaultArgs} size="WIDE" />);
    const button2 = screen.getByRole(role);
    expect(button2).toHaveClass("wide");
  });
});

describe("========== C4 BUTTON (AS LINK) - RUNNING TESTS ==========", () => {
  const defaultArgs = {
    label: "Sample Link",
    href: "https://www.google.com",
  };

  test("Renders PRIMARY link", () => {
    render(<Button variant="PRIMARY" {...defaultArgs} />);
    const button = screen.getByText(defaultArgs.label);
    expect(button).toHaveClass("button--primary");
  });

  test("Renders SECONDARY link", () => {
    render(<Button variant="SECONDARY" {...defaultArgs} />);
    const button = screen.getByText(defaultArgs.label);
    expect(button).toHaveClass("button--secondary");
  });

  test("Renders external link", () => {
    render(<Button {...defaultArgs} external />);
    const link = screen.getByText(defaultArgs.label);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
    expect(link).toHaveAttribute(
      "aria-label",
      `${defaultArgs.label} (opens in new window)`
    );
  });

  test("Renders link with icons", () => {
    render(
      <Button
        {...defaultArgs}
        iconRight="/icons/edit.svg"
        iconLeft="/icons/edit.svg"
      />
    );
    const button = screen.getByText(defaultArgs.label);
    const icons = button.getElementsByTagName("img");
    expect(icons.length).toBe(2);
  });

  test("Renders link in correct sizes", () => {
    // Buttons are narrow by default
    const { rerender } = render(<Button {...defaultArgs} />);
    const link1 = screen.getByText(defaultArgs.label);
    expect(link1).not.toHaveClass("wide");
    rerender(<Button {...defaultArgs} size="WIDE" />);
    const link2 = screen.getByText(defaultArgs.label);
    expect(link2).toHaveClass("wide");
  });
});
