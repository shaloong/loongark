import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonInputDialogExample } from "../examples/react/ButtonInputDialog";

const meta: Meta<typeof ButtonInputDialogExample> = {
  title: "Examples/Complete Demos/Button Input Dialog",
  component: ButtonInputDialogExample,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ButtonInputDialogExample>;

export const Default: Story = {
  render: () => <ButtonInputDialogExample />,
};
