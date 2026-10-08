/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
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
} from "@loongark/solid";
import type { EditableSize, EditableState } from "@loongark/primitives";

interface EditableExampleProps {
  size?: EditableSize;
  state?: EditableState;
  disabled?: boolean;
}

export const EditableExample: Component<EditableExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const state = () => props.state ?? "default";
  const disabled = () => props.disabled ?? false;
  const [value, setValue] = createSignal("LoongArk Design System");

  return (
    <LoongArkEditableRoot
      size={size()}
      state={state()}
      disabled={disabled()}
      value={value()}
      onValueChange={(details: { value: string }) => setValue(details.value)}
    >
      <LoongArkEditableLabel>Project name</LoongArkEditableLabel>
      <LoongArkEditableArea>
        <LoongArkEditablePreview />
        <LoongArkEditableInput state={state()} />
      </LoongArkEditableArea>
      <LoongArkEditableControl
        state={state()}
        style={{ display: "flex", gap: "8px" }}
      >
        <LoongArkEditableEditTrigger>Edit</LoongArkEditableEditTrigger>
        <LoongArkEditableSubmitTrigger>Save</LoongArkEditableSubmitTrigger>
        <LoongArkEditableCancelTrigger>Cancel</LoongArkEditableCancelTrigger>
      </LoongArkEditableControl>
    </LoongArkEditableRoot>
  );
};
