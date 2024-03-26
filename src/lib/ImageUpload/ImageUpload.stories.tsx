import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ImageUpload } from "./ImageUpload"
import { ImageType } from "./ImageUpload.types";

const meta: Meta<typeof ImageUpload> = {
    component: ImageUpload,
    title: "Components/Image Upload",
    tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const SampleComponent: Story = (args) => (
    <div style={{ minWidth: '300px', maxWidth: '420px' }}>
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
    accept: [ImageType.png, ImageType.jpeg],
    maxSize: 2
}