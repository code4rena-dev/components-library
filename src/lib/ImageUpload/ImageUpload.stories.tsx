import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ImageUpload } from "./ImageUpload"

const meta: Meta<typeof ImageUpload> = {
    component: ImageUpload,
    title: "Components/Image Upload",
    tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const SampleComponent: Story = (args) => (
    <div>
        <ImageUpload {...args} />
    </div>
)

SampleComponent.parameters = {
    docs: {
        canvas: {sourceState: "shown" }
    }
};
SampleComponent.args = {
    id: "c4_img_uploader",
    accept: "image/png, image/jpeg",
    maxSize: 2,
    multiSelect: false,
}