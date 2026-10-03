import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectExample } from "../examples/react/SelectExample";

/**
 * Select 下拉选择器组件
 *
 * 基于 Ark UI 实现的下拉选择组件，支持单选模式。
 */
const meta: Meta<typeof SelectExample> = {
  title: "Components/Select",
  component: SelectExample,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
      description: "选择器尺寸",
    },
    disabled: {
      control: { type: "boolean" },
      description: "是否禁用",
    },
    label: {
      control: { type: "text" },
      description: "标签文本",
    },
  },
  args: {
    size: "md",
    disabled: false,
    label: "选择城市",
  },
};

export default meta;
type Story = StoryObj<typeof SelectExample>;

export const Playground: Story = {};

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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
