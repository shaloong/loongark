import React, { useState } from "react";
import {
  LoongArkButton,
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
  LoongArkSegmentGroupItemHiddenInput,
  LoongArkSegmentGroupItemText,
} from "@loongark/react";
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

export const SegmentGroupExample: React.FC<SegmentGroupExampleProps> = ({
  size = "md",
  orientation = "horizontal",
  disabled = false,
}) => {
  const [value, setValue] = useState<string | null>("overview");

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <LoongArkSegmentGroupRoot
        aria-label="View"
        name="view"
        size={size}
        orientation={orientation}
        disabled={disabled}
        value={value}
        onValueChange={(details: { value: string | null }) =>
          setValue(details.value)
        }
      >
        {options.map((option) => (
          <LoongArkSegmentGroupItem key={option.value} value={option.value}>
            <LoongArkSegmentGroupItemHiddenInput />
            <LoongArkSegmentGroupItemText>
              {option.label}
            </LoongArkSegmentGroupItemText>
          </LoongArkSegmentGroupItem>
        ))}
      </LoongArkSegmentGroupRoot>
      <span
        style={{
          fontSize: "14px",
          color: "var(--lk-color-semantic-mutedforeground)",
        }}
      >
        Selected: {value || "None"}
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
