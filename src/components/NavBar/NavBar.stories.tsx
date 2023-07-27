import React from "react";
import NavBar from "./NavBar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  title: "Navigation Bar",
  tags: ["autodocs"],
  argTypes: {
    loginHandler: { control: "function" },
    logoutHandler: { control: "function" },
    modalHandler: { control: "function" },
  },
};
export default meta;

type Story = StoryObj<typeof NavBar>;

export const SampleComponent: Story = (args) => <NavBar {...args} />;
SampleComponent.parameters = {
  docs: {
    canvas: {
      sourceState: "shown",
    },
    story: {
      height: "300px",
    },
  },
};
SampleComponent.args = {
  isLoggedIn: true,
  hideConnectWalletDropdown: false,
  userImage: "/logos/apple-touch-icon.png",
  username: "TestUser",
  navLinks: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Audits", href: "/contests" },
    { label: "Reports", href: "/reports" },
    { label: "Docs", href: "https://docs.code4rena.com", external: true },
    { label: "Help", href: "/help" },
  ],
  loginHandler: () => console.log("Clicked Login!"),
  logoutHandler: () => console.log("Clicked Logout!"),
  modalHandler: () => console.log("Modal opening!"),
};
