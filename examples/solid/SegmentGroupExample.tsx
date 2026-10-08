/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  LoongArkButton,
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
  LoongArkSegmentGroupItemHiddenInput,
  LoongArkSegmentGroupItemText,
} from "@loongark/solid";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

export interface SegmentGroupExampleProps {
  size?: SegmentGroupSize;
  orientation?: SegmentGroupOrientation;
  disabled?: boolean;
}

const options = [
  { label: "Overview", value: "overview" },
  { label: "Activity", value: "activity" },
  { label: "Settings", value: "settings" },
];

export const SegmentGroupExample: Component<SegmentGroupExampleProps> = (
  props,
) => {
  const size = () => props.size ?? "md";
  const orientation = () => props.orientation ?? "horizontal";
  const disabled = () => props.disabled ?? false;
  const [value, setValue] = createSignal<string | null>("overview");

  return (
    <form style={{ display: "flex", "flex-direction": "column", gap: "12px" }}>
      <LoongArkSegmentGroupRoot
        aria-label="View"
        name="view"
        size={size()}
        orientation={orientation()}
        disabled={disabled()}
        value={value()}
        onValueChange={(details: { value: string | null }) =>
          setValue(details.value)
        }
      >
        {options.map((option) => (
          <LoongArkSegmentGroupItem value={option.value}>
            <LoongArkSegmentGroupItemHiddenInput />
            <LoongArkSegmentGroupItemText>
              {option.label}
            </LoongArkSegmentGroupItemText>
          </LoongArkSegmentGroupItem>
        ))}
      </LoongArkSegmentGroupRoot>
      <span
        style={{
          "font-size": "14px",
          color: "var(--lk-color-semantic-mutedforeground)",
        }}
      >
        Selected: {value() || "None"}
      </span>
      <LoongArkButton
        type="button"
        variant="outline"
        onClick={() => setValue("overview")}
      >
        Reset view
      </LoongArkButton>
    </form>
  );
};
