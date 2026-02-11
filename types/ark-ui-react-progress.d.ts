declare module "@ark-ui/react/progress" {
  import React, { type ReactNode } from "react";

  export interface ProgressRootProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    orientation?: "horizontal" | "vertical";
    translations?: any;
    onValueChange?: (details: { value: number }) => void;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ProgressLabelProps {
    ref?: React.Ref<HTMLLabelElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ProgressTrackProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ProgressRangeProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ProgressValueTextProps {
    ref?: React.Ref<HTMLSpanElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ProgressViewProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ProgressCircleProps
    extends React.SVGAttributes<SVGSVGElement> {
    ref?: React.Ref<SVGSVGElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ProgressCircleTrackProps
    extends React.SVGAttributes<SVGCircleElement> {
    ref?: React.Ref<SVGCircleElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ProgressCircleRangeProps
    extends React.SVGAttributes<SVGCircleElement> {
    ref?: React.Ref<SVGCircleElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export namespace Progress {
    export const Root: React.FC<ProgressRootProps>;
    export const Label: React.FC<ProgressLabelProps>;
    export const Track: React.FC<ProgressTrackProps>;
    export const Range: React.FC<ProgressRangeProps>;
    export const ValueText: React.FC<ProgressValueTextProps>;
    export const View: React.FC<ProgressViewProps>;
    export const Circle: React.FC<ProgressCircleProps>;
    export const CircleTrack: React.FC<ProgressCircleTrackProps>;
    export const CircleRange: React.FC<ProgressCircleRangeProps>;
  }
}
