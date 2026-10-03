/**
 * Progress component - Solid wrapper.
 * Uses Ark UI Progress with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  Progress as ArkProgress,
  type ProgressRootProps as ArkProgressRootProps,
  type ProgressLabelProps as ArkProgressLabelProps,
  type ProgressTrackProps as ArkProgressTrackProps,
  type ProgressRangeProps as ArkProgressRangeProps,
  type ProgressValueTextProps as ArkProgressValueTextProps,
  type ProgressViewProps as ArkProgressViewProps,
  type ProgressCircleProps as ArkProgressCircleProps,
  type ProgressCircleTrackProps as ArkProgressCircleTrackProps,
  type ProgressCircleRangeProps as ArkProgressCircleRangeProps,
} from "@ark-ui/solid/progress";
import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

export interface LoongArkProgressRootProps extends Omit<
  ArkProgressRootProps,
  "asChild"
> {
  size?: ProgressSize;
  orientation?: ProgressOrientation;
  children?: JSX.Element;
}

export const LoongArkProgressRoot: Component<LoongArkProgressRootProps> = (
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as ProgressSize,
      orientation: "horizontal" as ProgressOrientation,
    },
    props,
  );
  const [local, others] = splitProps(merged, [
    "children",
    "size",
    "orientation",
  ]);

  return (
    <ArkProgress.Root
      {...others}
      orientation={local.orientation}
      data-scope="progress"
      data-part="root"
      data-size={local.size}
      data-orientation={local.orientation}
    >
      {local.children}
    </ArkProgress.Root>
  );
};

export interface LoongArkProgressLabelProps extends Omit<
  ArkProgressLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkProgressLabel: Component<LoongArkProgressLabelProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkProgress.Label {...others} data-scope="progress" data-part="label">
      {local.children}
    </ArkProgress.Label>
  );
};

export interface LoongArkProgressTrackProps extends Omit<
  ArkProgressTrackProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkProgressTrack: Component<LoongArkProgressTrackProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkProgress.Track {...others} data-scope="progress" data-part="track">
      {local.children}
    </ArkProgress.Track>
  );
};

export interface LoongArkProgressRangeProps extends Omit<
  ArkProgressRangeProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkProgressRange: Component<LoongArkProgressRangeProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkProgress.Range {...others} data-scope="progress" data-part="range">
      {local.children}
    </ArkProgress.Range>
  );
};

export interface LoongArkProgressValueTextProps extends Omit<
  ArkProgressValueTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkProgressValueText: Component<
  LoongArkProgressValueTextProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkProgress.ValueText
      {...others}
      data-scope="progress"
      data-part="value-text"
    >
      {local.children}
    </ArkProgress.ValueText>
  );
};

export interface LoongArkProgressViewProps extends Omit<
  ArkProgressViewProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkProgressView: Component<LoongArkProgressViewProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkProgress.View {...others} data-scope="progress" data-part="view">
      {local.children}
    </ArkProgress.View>
  );
};

export interface LoongArkProgressCircleProps extends Omit<
  ArkProgressCircleProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkProgressCircle: Component<LoongArkProgressCircleProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkProgress.Circle {...others} data-scope="progress" data-part="circle">
      {local.children}
    </ArkProgress.Circle>
  );
};

export interface LoongArkProgressCircleTrackProps extends Omit<
  ArkProgressCircleTrackProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkProgressCircleTrack: Component<
  LoongArkProgressCircleTrackProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkProgress.CircleTrack
      {...others}
      data-scope="progress"
      data-part="circle-track"
    >
      {local.children}
    </ArkProgress.CircleTrack>
  );
};

export interface LoongArkProgressCircleRangeProps extends Omit<
  ArkProgressCircleRangeProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkProgressCircleRange: Component<
  LoongArkProgressCircleRangeProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkProgress.CircleRange
      {...others}
      data-scope="progress"
      data-part="circle-range"
    >
      {local.children}
    </ArkProgress.CircleRange>
  );
};
