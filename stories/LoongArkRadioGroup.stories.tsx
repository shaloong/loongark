import React from "react";
import { SelectionControlsExample } from "../examples/react/SelectionControlsExample";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroupExample } from "../examples/react/RadioGroupExample";

const meta: Meta<typeof RadioGroupExample> = {
  title: "Components/RadioGroup",
  component: RadioGroupExample,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "inline-radio" },
    },
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "inline-radio" },
    },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    orientation: "vertical",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroupExample>;

export const Playground: Story = {
  render: (args) => <RadioGroupExample {...args} />,
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ResponsiveControls: Story = {
  render: () => <SelectionControlsExample />,
};
