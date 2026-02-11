import React from "react";
import {
  LoongArkProgressRoot,
  LoongArkProgressLabel,
  LoongArkProgressTrack,
  LoongArkProgressRange,
  LoongArkProgressValueText,
  LoongArkProgressView,
  LoongArkProgressCircle,
  LoongArkProgressCircleTrack,
  LoongArkProgressCircleRange,
} from "@loongark/react";
import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

interface ProgressExampleProps {
  size?: ProgressSize;
  orientation?: ProgressOrientation;
  value?: number;
}

export const ProgressExample: React.FC<ProgressExampleProps> = ({
  size = "md",
  orientation = "horizontal",
  value = 48,
}) => {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <LoongArkProgressRoot
        value={value}
        size={size}
        orientation={orientation}
      >
        <LoongArkProgressLabel>Project setup</LoongArkProgressLabel>
        <LoongArkProgressTrack>
          <LoongArkProgressRange />
        </LoongArkProgressTrack>
        <LoongArkProgressValueText />
      </LoongArkProgressRoot>
      <LoongArkProgressRoot value={value} size={size}>
        <LoongArkProgressView>
          <LoongArkProgressCircle>
            <LoongArkProgressCircleTrack />
            <LoongArkProgressCircleRange />
          </LoongArkProgressCircle>
        </LoongArkProgressView>
        <LoongArkProgressValueText />
      </LoongArkProgressRoot>
    </div>
  );
};
