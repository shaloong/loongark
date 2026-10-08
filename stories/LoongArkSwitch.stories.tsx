import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwitchExample } from "../examples/react/SwitchExample";

const meta: Meta<typeof SwitchExample> = {
  title: "Components/Switch",
  component: SwitchExample,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "inline-radio" },
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    size: "md",
    disabled: false,
    label: "通知提醒",
  },
};

export default meta;

type Story = StoryObj<typeof SwitchExample>;

export const Playground: Story = {
  render: (args) => <SwitchExample {...args} />,
};
