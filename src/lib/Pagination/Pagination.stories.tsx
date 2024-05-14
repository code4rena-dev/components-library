import React from "react";
import { Pagination } from "./Pagination";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Pagination> = {
    component: Pagination,
    title: "Components/Pagination",
    tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const SampleComponent: Story = (args) => <Pagination {...args} />;
SampleComponent.parameters = {
    docs: {
        canvas: { sourceState: "shown" }
    }
};
SampleComponent.args = {
    itemsCount: 100,
    itemsPerPage: 10,
    onPageSelect: (page) => console.log(`New page selected! Page: ${page}`)
}