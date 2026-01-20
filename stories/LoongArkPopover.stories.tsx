import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkPopoverRoot,
  LoongArkPopoverTrigger,
  LoongArkPopoverPositioner,
  LoongArkPopoverContent,
  LoongArkPopoverArrow,
  LoongArkPopoverTitle,
  LoongArkPopoverDescription,
  LoongArkPopoverCloseTrigger,
} from "@loongark/react";
import { LoongArkButton } from "@loongark/react";

const meta: Meta = {
  title: "Components/Popover",
  parameters: {
    docs: {
      description: {
        component: "LoongArkPopover 基于 Ark UI Popover，支持标题、描述和关闭按钮，样式由 primitives 驱动。",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <LoongArkPopoverRoot>
      <LoongArkPopoverTrigger asChild>
        <LoongArkButton variant="outline">打开 Popover</LoongArkButton>
      </LoongArkPopoverTrigger>
      <LoongArkPopoverPositioner>
        <LoongArkPopoverContent>
          这是一段提示内容
          <LoongArkPopoverArrow />
          <LoongArkPopoverCloseTrigger>
            关闭
          </LoongArkPopoverCloseTrigger>
        </LoongArkPopoverContent>
      </LoongArkPopoverPositioner>
    </LoongArkPopoverRoot>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <LoongArkPopoverRoot>
      <LoongArkPopoverTrigger>
        <LoongArkButton>带标题的 Popover</LoongArkButton>
      </LoongArkPopoverTrigger>
      <LoongArkPopoverPositioner>
        <LoongArkPopoverContent>
          <LoongArkPopoverTitle>邀请成员</LoongArkPopoverTitle>
          <LoongArkPopoverDescription>
            设置角色后点击关闭即可完成。
          </LoongArkPopoverDescription>
          <LoongArkPopoverArrow />
          <LoongArkPopoverCloseTrigger>
            关闭
          </LoongArkPopoverCloseTrigger>
        </LoongArkPopoverContent>
      </LoongArkPopoverPositioner>
    </LoongArkPopoverRoot>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <LoongArkPopoverRoot>
      <LoongArkPopoverTrigger asChild>
        <LoongArkButton variant="outline">开启箭头的 Popover</LoongArkButton>
      </LoongArkPopoverTrigger>
      <LoongArkPopoverPositioner>
        <LoongArkPopoverContent showArrow>
          <LoongArkPopoverTitle>标题</LoongArkPopoverTitle>
          <LoongArkPopoverDescription>这是带箭头的内容。</LoongArkPopoverDescription>
          <LoongArkPopoverCloseTrigger>关闭</LoongArkPopoverCloseTrigger>
        </LoongArkPopoverContent>
      </LoongArkPopoverPositioner>
    </LoongArkPopoverRoot>
  ),
};
