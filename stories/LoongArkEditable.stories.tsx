import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkEditableRoot,
  LoongArkEditableLabel,
  LoongArkEditableArea,
  LoongArkEditableControl,
  LoongArkEditableInput,
  LoongArkEditablePreview,
  LoongArkEditableEditTrigger,
  LoongArkEditableSubmitTrigger,
  LoongArkEditableCancelTrigger,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Editable",
  parameters: {
    docs: {
      description: {
        component: "LoongArkEditable provides inline editing with control states.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface EditableDemoProps {
  size?: "sm" | "md" | "lg";
  state?: "default" | "invalid" | "success";
  disabled?: boolean;
  showLabel?: boolean;
}

const EditableDemo = ({
  size = "md",
  state = "default",
  disabled = false,
  showLabel = true,
}: EditableDemoProps) => {
  const [value, setValue] = React.useState("LoongArk Design System");

  return (
    <LoongArkEditableRoot
      size={size}
      state={state}
      disabled={disabled}
      value={value}
      onValueChange={(details: { value: string }) => setValue(details.value)}
    >
      {showLabel && (
        <LoongArkEditableLabel>Project name</LoongArkEditableLabel>
      )}
      <LoongArkEditableArea>
        <LoongArkEditablePreview />
        <LoongArkEditableInput state={state} />
      </LoongArkEditableArea>
      <LoongArkEditableControl
        state={state}
        style={{ display: "flex", gap: 8 }}
      >
        <LoongArkEditableEditTrigger>Edit</LoongArkEditableEditTrigger>
        <LoongArkEditableSubmitTrigger>Save</LoongArkEditableSubmitTrigger>
        <LoongArkEditableCancelTrigger>Cancel</LoongArkEditableCancelTrigger>
      </LoongArkEditableControl>
    </LoongArkEditableRoot>
  );
};

export const Basic: Story = {
  render: () => <EditableDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <EditableDemo showLabel />
      <EditableDemo showLabel={false} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <EditableDemo state="default" />
      <EditableDemo state="invalid" />
      <EditableDemo state="success" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <EditableDemo size="sm" />
      <EditableDemo size="md" />
      <EditableDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <EditableDemo />,
};
