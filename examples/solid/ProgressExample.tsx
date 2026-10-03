/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
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
} from "@loongark/solid";
import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

export interface ProgressExampleProps {
  size?: ProgressSize;
  orientation?: ProgressOrientation;
  value?: number;
}

export const ProgressExample: Component<ProgressExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const orientation = () => props.orientation ?? "horizontal";
  const value = () => props.value ?? 48;

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <LoongArkProgressRoot
        value={value()}
        size={size()}
        orientation={orientation()}
      >
        <LoongArkProgressLabel>Project setup</LoongArkProgressLabel>
        <LoongArkProgressTrack>
          <LoongArkProgressRange />
        </LoongArkProgressTrack>
        <LoongArkProgressValueText />
      </LoongArkProgressRoot>
      <LoongArkProgressRoot value={value()} size={size()}>
        <LoongArkProgressView state="loading">
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
