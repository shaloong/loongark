import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonInputDialogExample } from "../examples/react/ButtonInputDialog";

const meta: Meta<typeof ButtonInputDialogExample> = {
  title: "Examples/Complete Demos/Button Input Dialog",
  component: ButtonInputDialogExample,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ButtonInputDialogExample>;

export const Default: Story = {
  render: () => <ButtonInputDialogExample />,
};
