import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        sass: {
          implemenation: require("sass"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "/fonts": path.resolve(__dirname, "../public/fonts"),
        },
      };
    } else {
      config.resolve = {
        alias: {
          "/fonts": path.resolve(__dirname, "../public/fonts"),
        },
      };
    }
    return config;
  },
};
export default config;
