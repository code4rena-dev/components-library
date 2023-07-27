import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/_global.scss";

const wrapperStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: "0rem 1rem",
};

const preview: Preview = {
  decorators: [
    (Story) => (
      /* @ts-ignore */
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
