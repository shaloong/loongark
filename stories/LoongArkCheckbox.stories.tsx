import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxExample } from "../examples/react/CheckboxExample";

const meta: Meta<typeof CheckboxExample> = {
  title: "Components/Checkbox",
  component: CheckboxExample,
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
    label: "同意条款",
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxExample>;

export const Playground: Story = {
  render: (args) => <CheckboxExample {...args} />,
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "记住密码",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    label: "接受服务条款",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "订阅邮件通知",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "已禁用的选项",
  },
};
