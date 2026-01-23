import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
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
  props
) => {
  const size = () => props.size ?? "md";
  const orientation = () => props.orientation ?? "horizontal";
  const disabled = () => props.disabled ?? false;
  const [value, setValue] = createSignal<string[]>(["overview"]);

  return (
    <div style={{ display: "flex", "flex-direction": "column", gap: "12px" }}>
      <LoongArkSegmentGroupRoot
        size={size()}
        orientation={orientation()}
        disabled={disabled()}
        value={value()}
        onValueChange={(details: { value: string[] }) => setValue(details.value)}
      >
        {options.map((option) => (
          <LoongArkSegmentGroupItem value={option.value}>
            {option.label}
          </LoongArkSegmentGroupItem>
        ))}
      </LoongArkSegmentGroupRoot>
      <span style={{ "font-size": "14px", color: "#666" }}>
        Selected: {value()[0] || "None"}
      </span>
    </div>
  );
};
