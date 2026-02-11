import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkHoverCardRoot,
  LoongArkHoverCardTrigger,
  LoongArkHoverCardPositioner,
  LoongArkHoverCardContent,
  LoongArkHoverCardArrow,
  LoongArkHoverCardArrowTip,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/HoverCard",
  parameters: {
    docs: {
      description: {
        component: "LoongArkHoverCard displays rich previews on hover.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface HoverCardDemoProps {
  size?: "sm" | "md" | "lg";
  defaultOpen?: boolean;
  subtitle?: string;
}

const HoverCardDemo = ({
  size = "md",
  defaultOpen = false,
  subtitle = "Design-ready UI primitives.",
}: HoverCardDemoProps) => {
  return (
    <LoongArkHoverCardRoot size={size} defaultOpen={defaultOpen} openDelay={200}>
      <LoongArkHoverCardTrigger>Hover details</LoongArkHoverCardTrigger>
      <LoongArkHoverCardPositioner>
        <LoongArkHoverCardContent>
          <div style={{ display: "grid", gap: 6 }}>
            <strong>@loongark</strong>
            <span style={{ opacity: 0.7 }}>{subtitle}</span>
          </div>
          <LoongArkHoverCardArrow>
            <LoongArkHoverCardArrowTip />
          </LoongArkHoverCardArrow>
        </LoongArkHoverCardContent>
      </LoongArkHoverCardPositioner>
    </LoongArkHoverCardRoot>
  );
};

export const Basic: Story = {
  render: () => <HoverCardDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <HoverCardDemo subtitle="Design-ready UI primitives." />
      <HoverCardDemo subtitle="Live status, contributors, and next steps." />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <HoverCardDemo defaultOpen={false} />
      <HoverCardDemo defaultOpen />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <HoverCardDemo size="sm" />
      <HoverCardDemo size="md" />
      <HoverCardDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <HoverCardDemo />,
};
