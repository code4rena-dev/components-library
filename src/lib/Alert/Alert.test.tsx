import React from "react";
import { Alert } from "./Alert";
import { AlertVariant } from "./Alert.types";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const defaultArgs = {
  title: "Alert Test",
  message: "This is a test message for the alert component.",
};

describe("========== C4 ALERT - RUNNING TESTS ==========", () => {
  test("Renders with custom id and classNames", () => {
    const customClass = "custom-alert-1 custom-alert-2";
    const customId = "test_id";
    render(
      <Alert
        variant={AlertVariant.INFO}
        id={customId}
        className={customClass}
        {...defaultArgs}
      />
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(customClass);
    expect(alert).toHaveAttribute("id", customId);
  });

  test("Renders INFO alert", () => {
    render(<Alert variant={AlertVariant.INFO} {...defaultArgs} />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert--info");
  });

  test("Renders MUTED alert", () => {
    render(<Alert variant={AlertVariant.MUTED} {...defaultArgs} />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert--muted");
  });

  test("Renders WARNING alert", () => {
    render(<Alert variant={AlertVariant.WARNING} {...defaultArgs} />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert--warning");
  });

  test("Renders ERROR alert", () => {
    render(<Alert variant={AlertVariant.ERROR} {...defaultArgs} />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("alert--error");
  });

  test("Renders with provided redirectUrl and default label for missing redirectLabel prop", () => {
    const redirectUrl = "https://www.code4rena.com";
    render(
      <Alert
        variant={AlertVariant.INFO}
        redirectUrl={redirectUrl}
        {...defaultArgs}
      />
    );
    const anchor = screen.getByText("Read more on this alert");
    expect(anchor).toBeTruthy();
    expect(anchor).toHaveAttribute(
      "aria-label",
      "Read more on this alert (opens in new window)"
    );
    expect(anchor).toHaveAttribute("href", redirectUrl);
  });

  test("Renders with provided redirectUrl and provided redirectLabel", () => {
    const redirectUrl = "https://www.code4rena.com";
    const redirectLabel = "Redirect Test";
    render(
      <Alert
        variant={AlertVariant.INFO}
        redirectUrl={redirectUrl}
        redirectLabel={redirectLabel}
        {...defaultArgs}
      />
    );
    const anchor = screen.getByText(redirectLabel);
    expect(anchor).toBeTruthy();
    expect(anchor).toHaveAttribute(
      "aria-label",
      `${redirectLabel} (opens in new window)`
    );
    expect(anchor).toHaveAttribute("href", redirectUrl);
  });
});
