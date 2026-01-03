/**
 * Tooltip Story - 展示多状态与交互
 */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkTooltipRoot,
  LoongArkTooltipTrigger,
  LoongArkTooltipPositioner,
  LoongArkTooltipContent,
  LoongArkTooltipArrow,
  LoongArkTooltipArrowTip,
} from "@loongark/react";
import { LoongArkButton } from "@loongark/react";

const meta: Meta = {
  title: "Components/Tooltip",
  parameters: {
    docs: {
      description: {
        component: "LoongArkTooltip 基于 Ark UI Tooltip，支持 interactive / delay / 方向等 props，样式由 primitives 驱动。",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <LoongArkTooltipRoot>
      <LoongArkTooltipTrigger asChild>
        <LoongArkButton variant="outline">悬停查看提示</LoongArkButton>
      </LoongArkTooltipTrigger>
      <LoongArkTooltipPositioner>
        <LoongArkTooltipContent>
          这是一个简短提示
          <LoongArkTooltipArrow>
            <LoongArkTooltipArrowTip />
          </LoongArkTooltipArrow>
        </LoongArkTooltipContent>
      </LoongArkTooltipPositioner>
    </LoongArkTooltipRoot>
  ),
};

export const Interactive: Story = {
  render: () => (
    <LoongArkTooltipRoot interactive closeDelay={150} openDelay={300} closeOnScroll={false}>
      <LoongArkTooltipTrigger>
        <LoongArkButton>悬停可交互</LoongArkButton>
      </LoongArkTooltipTrigger>
      <LoongArkTooltipPositioner>
        <LoongArkTooltipContent interactive>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span>这里可以放链接或按钮</span>
            <LoongArkButton size="sm" variant="ghost">
              操作
            </LoongArkButton>
          </div>
          <LoongArkTooltipArrow>
            <LoongArkTooltipArrowTip />
          </LoongArkTooltipArrow>
        </LoongArkTooltipContent>
      </LoongArkTooltipPositioner>
    </LoongArkTooltipRoot>
  ),
};

