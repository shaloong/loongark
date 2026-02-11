import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkScrollAreaRoot,
  LoongArkScrollAreaViewport,
  LoongArkScrollAreaContent,
  LoongArkScrollAreaScrollbar,
  LoongArkScrollAreaThumb,
  LoongArkScrollAreaCorner,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/ScrollArea",
  parameters: {
    docs: {
      description: {
        component: "LoongArkScrollArea provides styled scrollbars for long content.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const items = Array.from({ length: 12 }, (_, index) => `Release note ${index + 1}`);

interface ScrollAreaDemoProps {
  size?: "sm" | "md" | "lg";
  height?: number;
  showHorizontal?: boolean;
}

const ScrollAreaDemo = ({
  size = "md",
  height = 200,
  showHorizontal = true,
}: ScrollAreaDemoProps) => {
  return (
    <LoongArkScrollAreaRoot size={size} style={{ width: 320, height }}>
      <LoongArkScrollAreaViewport>
        <LoongArkScrollAreaContent>
          <div style={{ display: "grid", gap: 8, padding: 12 }}>
            {items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </LoongArkScrollAreaContent>
      </LoongArkScrollAreaViewport>
      <LoongArkScrollAreaScrollbar orientation="vertical">
        <LoongArkScrollAreaThumb />
      </LoongArkScrollAreaScrollbar>
      {showHorizontal && (
        <LoongArkScrollAreaScrollbar orientation="horizontal">
          <LoongArkScrollAreaThumb />
        </LoongArkScrollAreaScrollbar>
      )}
      <LoongArkScrollAreaCorner />
    </LoongArkScrollAreaRoot>
  );
};

export const Basic: Story = {
  render: () => <ScrollAreaDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ScrollAreaDemo showHorizontal />
      <ScrollAreaDemo showHorizontal={false} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ScrollAreaDemo height={200} />
      <ScrollAreaDemo height={120} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ScrollAreaDemo size="sm" />
      <ScrollAreaDemo size="md" />
      <ScrollAreaDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <ScrollAreaDemo />,
};
