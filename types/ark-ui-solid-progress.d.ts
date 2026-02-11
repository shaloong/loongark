declare module "@ark-ui/solid/progress" {
  import type { Component, JSX } from "solid-js";

  export interface ProgressRootProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    orientation?: "horizontal" | "vertical";
    translations?: any;
    onValueChange?: (details: { value: number }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ProgressLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ProgressTrackProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ProgressRangeProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ProgressValueTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ProgressViewProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ProgressCircleProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ProgressCircleTrackProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ProgressCircleRangeProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Progress: {
    Root: Component<ProgressRootProps>;
    Label: Component<ProgressLabelProps>;
    Track: Component<ProgressTrackProps>;
    Range: Component<ProgressRangeProps>;
    ValueText: Component<ProgressValueTextProps>;
    View: Component<ProgressViewProps>;
    Circle: Component<ProgressCircleProps>;
    CircleTrack: Component<ProgressCircleTrackProps>;
    CircleRange: Component<ProgressCircleRangeProps>;
  };
}
