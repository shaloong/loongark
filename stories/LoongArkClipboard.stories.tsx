import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkClipboardRoot,
  LoongArkClipboardLabel,
  LoongArkClipboardControl,
  LoongArkClipboardInput,
  LoongArkClipboardTrigger,
  LoongArkClipboardIndicator,
  LoongArkClipboardValueText,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Clipboard",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkClipboard provides copy-friendly input styling and states.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface ClipboardDemoProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  showIndicator?: boolean;
}

const ClipboardDemo = ({
  size = "md",
  disabled = false,
  showIndicator = true,
}: ClipboardDemoProps) => {
  const [value, setValue] = React.useState("https://loongark.dev");

  return (
    <LoongArkClipboardRoot size={size} disabled={disabled} value={value}>
      <LoongArkClipboardLabel>Share link</LoongArkClipboardLabel>
      <LoongArkClipboardControl>
        <LoongArkClipboardInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          readOnly={disabled}
        />
        <LoongArkClipboardTrigger disabled={disabled}>
          Copy
        </LoongArkClipboardTrigger>
      </LoongArkClipboardControl>
      {showIndicator && (
        <LoongArkClipboardIndicator>Copied</LoongArkClipboardIndicator>
      )}
      <LoongArkClipboardValueText>{value}</LoongArkClipboardValueText>
    </LoongArkClipboardRoot>
  );
};

export const Basic: Story = {
  render: () => <ClipboardDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ClipboardDemo showIndicator />
      <ClipboardDemo showIndicator={false} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ClipboardDemo disabled={false} />
      <ClipboardDemo disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ClipboardDemo size="sm" />
      <ClipboardDemo size="md" />
      <ClipboardDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <ClipboardDemo />,
};
