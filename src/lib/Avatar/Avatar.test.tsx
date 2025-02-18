import React from "react";
import { Avatar } from "./Avatar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const defaultArgs = {
  name: "John Doe",
  size: 50,
  round: 25,
};

describe("========== Avatar Component - RUNNING TESTS ==========", () => {
  test("Renders with image avatar", () => {
    const imgElement = (
      <img src="./images/default-avatar.png" alt="Placeholder" />
    );
    render(<Avatar imgElement={imgElement} {...defaultArgs} />);
    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("src", "./images/default-avatar.png");
  });

  test("Renders with initials avatar", () => {
    render(<Avatar {...defaultArgs} />);
    const avatar = screen.getByText("JD");
    expect(avatar).toBeInTheDocument();
  });

  test("Sets alt text for image avatar", () => {
    const imgElement = (
      <img src="./images/default-avatar.png" alt="User avatar" />
    );
    render(<Avatar imgElement={imgElement} {...defaultArgs} />);
    const avatar = screen.getByAltText("User avatar");
    expect(avatar).toBeInTheDocument();
  });
});
