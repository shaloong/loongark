import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LoongArkTabsRoot,
  LoongArkTabsList,
  LoongArkTabsTrigger,
  LoongArkTabsContent,
  LoongArkTabsIndicator,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Tabs",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkTabs 基于 Ark UI Tabs，支持 size / orientation 变体，样式由 primitives 驱动。",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface TabsDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const panelStyle = {
  padding: "12px 4px",
  color: "var(--lk-color-semantic-foreground)",
};

const TabsDemo = ({
  size = "md",
  orientation = "horizontal",
}: TabsDemoProps) => (
  <LoongArkTabsRoot
    defaultValue="overview"
    size={size}
    orientation={orientation}
  >
    <LoongArkTabsList>
      <LoongArkTabsTrigger value="overview">概览</LoongArkTabsTrigger>
      <LoongArkTabsTrigger value="activity">动态</LoongArkTabsTrigger>
      <LoongArkTabsTrigger value="settings">设置</LoongArkTabsTrigger>
      <LoongArkTabsIndicator />
    </LoongArkTabsList>
    <LoongArkTabsContent value="overview">
      <div style={panelStyle}>这里展示概要信息。</div>
    </LoongArkTabsContent>
    <LoongArkTabsContent value="activity">
      <div style={panelStyle}>这里展示最近动态。</div>
    </LoongArkTabsContent>
    <LoongArkTabsContent value="settings">
      <div style={panelStyle}>这里展示配置项。</div>
    </LoongArkTabsContent>
  </LoongArkTabsRoot>
);

export const Basic: Story = {
  render: () => <TabsDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TabsDemo size="sm" />
      <TabsDemo size="md" />
      <TabsDemo size="lg" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <TabsDemo orientation="vertical" />
    </div>
  ),
};
