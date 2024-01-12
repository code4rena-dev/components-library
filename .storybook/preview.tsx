import React, { CSSProperties } from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/base/typography.scss";

const wrapperStyle: CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "0rem 1rem",
  marginTop: "2rem",
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={wrapperStyle}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: "C4-Dark",
      values: [
        {
          name: "C4-Dark",
          value: "hsl(260, 13%, 5%)",
        },
      ],
    },
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
