import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterBarExample } from "../examples/react/FilterBar";

const meta: Meta<typeof FilterBarExample> = {
  title: "Examples/Complete Demos/Filter Bar",
  component: FilterBarExample,
};

export default meta;

type Story = StoryObj<typeof FilterBarExample>;

export const Default: Story = {
  render: () => <FilterBarExample />,
};
