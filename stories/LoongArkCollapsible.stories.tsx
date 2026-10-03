import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LoongArkCollapsibleRoot,
  LoongArkCollapsibleTrigger,
  LoongArkCollapsibleContent,
  LoongArkCollapsibleIndicator,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Collapsible",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkCollapsible wraps Ark UI Collapsible with token-driven styling and size variants.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface CollapsibleDemoProps {
  size?: "sm" | "md" | "lg";
  defaultOpen?: boolean;
}

const panelStyle = { color: "var(--lk-color-semantic-foreground)" };

const CollapsibleDemo = ({
  size = "md",
  defaultOpen = true,
}: CollapsibleDemoProps) => (
  <LoongArkCollapsibleRoot defaultOpen={defaultOpen} size={size}>
    <LoongArkCollapsibleTrigger>
      <span>Release notes</span>
      <LoongArkCollapsibleIndicator>&gt;</LoongArkCollapsibleIndicator>
    </LoongArkCollapsibleTrigger>
    <LoongArkCollapsibleContent>
      <div style={panelStyle}>
        Version 0.6 adds theming hooks, improved focus rings, and new tokens.
      </div>
    </LoongArkCollapsibleContent>
  </LoongArkCollapsibleRoot>
);

export const Basic: Story = {
  render: () => <CollapsibleDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <CollapsibleDemo size="sm" />
      <CollapsibleDemo size="md" />
      <CollapsibleDemo size="lg" />
    </div>
  ),
};
