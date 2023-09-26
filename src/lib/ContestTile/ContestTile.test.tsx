import React from "react";
import { ContestTile } from "./ContestTile";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("========== C4 CONTEST TILE - RUNNNING TESTS ==========", () => {
  const defaultArgs = {
    isUserCertified: false,
    contestId: 456,
    sponsorImage: "/logos/apple-touch-icon.png",
    sponsorUrl: "https://twitter.com/axelarcore",
    contestUrl: "https://code4rena.com/contests/2023-07-axelar-network#top",
    contestRepo: "https://github.com/code-423n4/2023-07-axelar",
    findingsRepo: "https://github.com/code-423n4/2023-07-axelar",
    title: "Axelar Network",
    description: "Decentralized interoperability network.",
    amount: "$80,000 USDC",
    startDate: "2023-07-12T18:00:00Z",
    endDate: "2023-07-21T18:00:00Z",
  };

  test("Renders with custom id", () => {
    const customId = "test_id";
    render(
      <ContestTile
        {...defaultArgs}
        htmlId={customId}
        variant="DARK"
        codeAccess="public"
      />
    );
    const alert = screen.getByTestId(customId);
    expect(alert).toHaveAttribute("id", customId);
  });
});
