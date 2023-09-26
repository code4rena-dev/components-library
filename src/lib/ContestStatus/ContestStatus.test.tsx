import React from "react";
import { ContestStatus } from "./ContestStatus";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("========== C4 CONTEST STATUS - RUNNING TESTS ==========", () => {
  test("Renders a live status", () => {
    render(<ContestStatus status="LIVE" />);
    const status = screen.getByText("Live");
    expect(status).not.toBeNull();
    const indicator = status.getElementsByClassName("live");
    expect(indicator.length).toBeGreaterThan(0);
  });

  test("Renders an upcoming status", () => {
    render(<ContestStatus status="UPCOMING" />);
    const status = screen.getByText("Soon");
    expect(status).not.toBeNull();
    const indicator = status.getElementsByClassName("upcoming");
    expect(indicator.length).toBeGreaterThan(0);
  });

  test("Renders an ended status", () => {
    render(<ContestStatus status="ENDED" />);
    const status = screen.getByText("Ended");
    expect(status).not.toBeNull();
    const indicator = status.getElementsByClassName("ended");
    expect(indicator.length).toBeGreaterThan(0);
  });
});
