import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoongArkButton } from "@loongark/react";

const meta: Meta<typeof LoongArkButton> = {
  title: "Components/Button",
  component: LoongArkButton,
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkButton 是 Ark UI Button 的皮肤层，variant/size/block/loading 均映射到 primitives token。",
      },
    },
  },
  argTypes: {
    variant: {
      options: ["solid", "outline", "ghost"],
      control: { type: "inline-radio" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "inline-radio" },
    },
    block: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "发送邀请",
    variant: "solid",
    size: "md",
    block: false,
    loading: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof LoongArkButton>;

export const Playground: Story = {
  render: (args) => <LoongArkButton {...args} />,
};

export const Loading: Story = {
  args: {
    loading: true,
    disabled: true,
    children: "处理中…",
  },
};
