import React, { useState } from "react";
import {
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
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
  const [value, setValue] = useState<string[]>(["overview"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <LoongArkSegmentGroupRoot
        size={size}
        orientation={orientation}
        disabled={disabled}
        value={value}
        onValueChange={(details: { value: string[] }) =>
          setValue(details.value)
        }
      >
        {options.map((option) => (
          <LoongArkSegmentGroupItem key={option.value} value={option.value}>
            {option.label}
          </LoongArkSegmentGroupItem>
        ))}
      </LoongArkSegmentGroupRoot>
      <span
        style={{
          fontSize: "14px",
          color: "var(--lk-color-semantic-mutedforeground)",
        }}
      >
        Selected: {value[0] || "None"}
      </span>
    </div>
  );
};
