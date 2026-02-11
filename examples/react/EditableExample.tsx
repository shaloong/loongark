import React from "react";
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
import type { EditableSize, EditableState } from "@loongark/primitives";

interface EditableExampleProps {
  size?: EditableSize;
  state?: EditableState;
  disabled?: boolean;
}

export const EditableExample: React.FC<EditableExampleProps> = ({
  size = "md",
  state = "default",
  disabled = false,
}) => {
  const [value, setValue] = React.useState("LoongArk Design System");

  return (
    <LoongArkEditableRoot
      size={size}
      state={state}
      disabled={disabled}
      value={value}
      onValueChange={(details: { value: string }) => setValue(details.value)}
    >
      <LoongArkEditableLabel>Project name</LoongArkEditableLabel>
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
