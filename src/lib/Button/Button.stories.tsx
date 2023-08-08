import React from "react";
import { Button } from "./Button";
import { Meta, StoryObj } from "@storybook/react";
import { ButtonSize, ButtonType, ButtonVariant } from "./Button.types";

const wrapperStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select" },
    type: { control: "select", if: { arg: "href", truthy: false } },
    size: { control: "select" },
    onClick: {
      control: "function",
      action: "clicked",
      if: { arg: "href", truthy: false },
    },
    disabled: {
      if: { arg: "href", truthy: false },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const SampleComponent: Story = (args) => (
  <Button onClick={() => console.log("Sample Button clicked!")} {...args} />
);
SampleComponent.parameters = {
  docs: {
    canvas: { sourceState: "shown" },
  },
};
SampleComponent.args = {
  variant: ButtonVariant.PRIMARY,
  label: "Sample Button",
  type: ButtonType.BUTTON,
  external: false,
  href: "",
  disabled: false,
  iconLeft: "",
  iconRight: "/icons/edit.svg",
  size: ButtonSize.NARROW,
  className: "",
  id: "",
};

/**
 * Below is a collection of the different states in which you can find C4 links. A button becomes a link once an `href` property is provided to the component.
 * - __Internal__: An internal link handles in-app navigation.
 * - __External__: An external link will open the provided href in a new tab.
 * - __Icons__: All links can take icons on either (or both) sides of the label.
 *
 * __Link-specific props:__
 * - `href`
 * - `external`
 */
export const Links: Story = {
  render: (args) => (
    <>
      {/* Primary */}
      {/* @ts-ignore */}
      <div style={wrapperStyle}>
        <Button
          variant={ButtonVariant.PRIMARY}
          label="Primary Internal Link"
          href="#internal-test"
        />
        <Button
          variant={ButtonVariant.PRIMARY}
          external
          label="Primary External Link"
          href="https://google.com"
        />
        <Button
          variant={ButtonVariant.PRIMARY}
          href="#internal-test"
          label="Primary Link W/ Icons"
          iconLeft="/icons/edit.svg"
          iconRight="/icons/edit.svg"
        />
      </div>
      {/* Secondary */}
      {/* @ts-ignore */}
      <div style={wrapperStyle}>
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Secondary Internal Link"
          href="#internal-test"
        />
        <Button
          variant={ButtonVariant.SECONDARY}
          external
          label="Secondary External Link"
          href="https://google.com"
        />
        <Button
          variant={ButtonVariant.SECONDARY}
          href="#internal-test"
          label="Secondary Link W/ Icons"
          iconLeft="/icons/edit.svg"
          iconRight="/icons/edit.svg"
        />
      </div>
    </>
  ),
};
Links.parameters = {
  controls: { hideNoControlsWarning: true, include: [] },
};

/**
 * Below is a collection of the different states in which you can find C4 buttons.
 * - __Enabled__: The natural state of any active button.
 * - __Disabled__: The state of a button that has its `disabled` prop set to true.
 * - __Icons__: All buttons can take icons on either (or both) sides of the label.
 *
 * __Button-specific props:__
 * - `onClick`
 * - `disabled`
 * - `type`
 */
export const Buttons: Story = {
  render: (args) => (
    <>
      {/* Primary */}
      {/* @ts-ignore */}
      <div style={wrapperStyle}>
        <Button
          variant={ButtonVariant.PRIMARY}
          onClick={() => null}
          label="Primary Enabled Button"
        />
        <Button
          variant={ButtonVariant.PRIMARY}
          onClick={() => null}
          label="Primary Button W/ Icons"
          iconLeft="/icons/edit.svg"
          iconRight="/icons/edit.svg"
        />
      </div>
      {/* Secondary */}
      {/* @ts-ignore */}
      <div style={wrapperStyle}>
        <Button
          variant={ButtonVariant.SECONDARY}
          onClick={() => null}
          label="Secondary Enabled Button"
        />
        <Button
          variant={ButtonVariant.SECONDARY}
          onClick={() => null}
          label="Secondary Button W/ Icons"
          iconLeft="/icons/edit.svg"
          iconRight="/icons/edit.svg"
        />
        <Button
          variant={ButtonVariant.SECONDARY}
          onClick={() => null}
          label="Primary/Secondary Disabled Button"
          disabled
        />
      </div>
    </>
  ),
};
Buttons.parameters = {
  controls: { hideNoControlsWarning: true, include: [] },
};
