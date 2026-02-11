/**
 * Progress component - React wrapper.
 * Uses Ark UI Progress with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Progress } from "@ark-ui/react/progress";
import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

type ArkProgressRootProps = ComponentPropsWithoutRef<typeof Progress.Root>;
type ArkProgressLabelProps = ComponentPropsWithoutRef<typeof Progress.Label>;
type ArkProgressTrackProps = ComponentPropsWithoutRef<typeof Progress.Track>;
type ArkProgressRangeProps = ComponentPropsWithoutRef<typeof Progress.Range>;
type ArkProgressValueTextProps = ComponentPropsWithoutRef<typeof Progress.ValueText>;
type ArkProgressViewProps = ComponentPropsWithoutRef<typeof Progress.View>;
type ArkProgressCircleProps = ComponentPropsWithoutRef<typeof Progress.Circle>;
type ArkProgressCircleTrackProps = ComponentPropsWithoutRef<typeof Progress.CircleTrack>;
type ArkProgressCircleRangeProps = ComponentPropsWithoutRef<typeof Progress.CircleRange>;

export interface LoongArkProgressRootProps
  extends Omit<ArkProgressRootProps, "asChild"> {
  size?: ProgressSize;
  orientation?: ProgressOrientation;
  children?: ReactNode;
}

export interface LoongArkProgressLabelProps
  extends Omit<ArkProgressLabelProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkProgressTrackProps
  extends Omit<ArkProgressTrackProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkProgressRangeProps
  extends Omit<ArkProgressRangeProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkProgressValueTextProps
  extends Omit<ArkProgressValueTextProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkProgressViewProps
  extends Omit<ArkProgressViewProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkProgressCircleProps
  extends Omit<ArkProgressCircleProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkProgressCircleTrackProps
  extends Omit<ArkProgressCircleTrackProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkProgressCircleRangeProps
  extends Omit<ArkProgressCircleRangeProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkProgressRoot = forwardRef<
  HTMLDivElement,
  LoongArkProgressRootProps
>(({ children, size = "md", orientation = "horizontal", ...props }, ref) => {
  return (
    <Progress.Root
      {...props}
      ref={ref}
      orientation={orientation}
      data-scope="progress"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </Progress.Root>
  );
});

LoongArkProgressRoot.displayName = "LoongArkProgressRoot";

export const LoongArkProgressLabel = forwardRef<
  HTMLLabelElement,
  LoongArkProgressLabelProps
>(({ children, ...props }, ref) => {
  return (
    <Progress.Label
      {...props}
      ref={ref}
      data-scope="progress"
      data-part="label"
    >
      {children}
    </Progress.Label>
  );
});

LoongArkProgressLabel.displayName = "LoongArkProgressLabel";

export const LoongArkProgressTrack = forwardRef<
  HTMLDivElement,
  LoongArkProgressTrackProps
>(({ children, ...props }, ref) => {
  return (
    <Progress.Track
      {...props}
      ref={ref}
      data-scope="progress"
      data-part="track"
    >
      {children}
    </Progress.Track>
  );
});

LoongArkProgressTrack.displayName = "LoongArkProgressTrack";

export const LoongArkProgressRange = forwardRef<
  HTMLDivElement,
  LoongArkProgressRangeProps
>(({ children, ...props }, ref) => {
  return (
    <Progress.Range
      {...props}
      ref={ref}
      data-scope="progress"
      data-part="range"
    >
      {children}
    </Progress.Range>
  );
});

LoongArkProgressRange.displayName = "LoongArkProgressRange";

export const LoongArkProgressValueText = forwardRef<
  HTMLSpanElement,
  LoongArkProgressValueTextProps
>(({ children, ...props }, ref) => {
  return (
    <Progress.ValueText
      {...props}
      ref={ref}
      data-scope="progress"
      data-part="value-text"
    >
      {children}
    </Progress.ValueText>
  );
});

LoongArkProgressValueText.displayName = "LoongArkProgressValueText";

export const LoongArkProgressView = forwardRef<
  HTMLDivElement,
  LoongArkProgressViewProps
>(({ children, ...props }, ref) => {
  return (
    <Progress.View
      {...props}
      ref={ref}
      data-scope="progress"
      data-part="view"
    >
      {children}
    </Progress.View>
  );
});

LoongArkProgressView.displayName = "LoongArkProgressView";

export const LoongArkProgressCircle = forwardRef<
  SVGSVGElement,
  LoongArkProgressCircleProps
>(({ children, ...props }, ref) => {
  return (
    <Progress.Circle
      {...props}
      ref={ref}
      data-scope="progress"
      data-part="circle"
    >
      {children}
    </Progress.Circle>
  );
});

LoongArkProgressCircle.displayName = "LoongArkProgressCircle";

export const LoongArkProgressCircleTrack = forwardRef<
  SVGCircleElement,
  LoongArkProgressCircleTrackProps
>(({ children, ...props }, ref) => {
  return (
    <Progress.CircleTrack
      {...props}
      ref={ref}
      data-scope="progress"
      data-part="circle-track"
    >
      {children}
    </Progress.CircleTrack>
  );
});

LoongArkProgressCircleTrack.displayName = "LoongArkProgressCircleTrack";

export const LoongArkProgressCircleRange = forwardRef<
  SVGCircleElement,
  LoongArkProgressCircleRangeProps
>(({ children, ...props }, ref) => {
  return (
    <Progress.CircleRange
      {...props}
      ref={ref}
      data-scope="progress"
      data-part="circle-range"
    >
      {children}
    </Progress.CircleRange>
  );
});

LoongArkProgressCircleRange.displayName = "LoongArkProgressCircleRange";
