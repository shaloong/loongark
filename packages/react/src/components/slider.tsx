/**
 * Slider component - React wrapper
 * Based on Ark UI Slider with data-scope/data-part bindings
 */
import React, { forwardRef, type ReactNode } from "react";
import {
  Slider as ArkSlider,
  type SliderRootProps as ArkSliderRootProps,
  type SliderLabelProps as ArkSliderLabelProps,
  type SliderValueTextProps as ArkSliderValueTextProps,
  type SliderControlProps as ArkSliderControlProps,
  type SliderTrackProps as ArkSliderTrackProps,
  type SliderRangeProps as ArkSliderRangeProps,
  type SliderThumbProps as ArkSliderThumbProps,
  type SliderMarkerGroupProps as ArkSliderMarkerGroupProps,
  type SliderMarkerProps as ArkSliderMarkerProps,
  type SliderDraggingIndicatorProps as ArkSliderDraggingIndicatorProps,
  type SliderHiddenInputProps as ArkSliderHiddenInputProps,
} from "@ark-ui/react/slider";
import type { SliderOrientation, SliderSize } from "@loongark/primitives";

export interface LoongArkSliderRootProps extends Omit<
  ArkSliderRootProps,
  "asChild"
> {
  size?: SliderSize;
  orientation?: SliderOrientation;
  children?: ReactNode;
}

export interface LoongArkSliderLabelProps extends Omit<
  ArkSliderLabelProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderValueTextProps extends Omit<
  ArkSliderValueTextProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderControlProps extends Omit<
  ArkSliderControlProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderTrackProps extends Omit<
  ArkSliderTrackProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderRangeProps extends Omit<
  ArkSliderRangeProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderThumbProps extends Omit<
  ArkSliderThumbProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderMarkerGroupProps extends Omit<
  ArkSliderMarkerGroupProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderMarkerProps extends Omit<
  ArkSliderMarkerProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderDraggingIndicatorProps extends Omit<
  ArkSliderDraggingIndicatorProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkSliderHiddenInputProps extends Omit<
  ArkSliderHiddenInputProps,
  "asChild"
> {}

export const LoongArkSliderRoot = forwardRef<
  HTMLDivElement,
  LoongArkSliderRootProps
>(({ size = "md", orientation = "horizontal", ...props }, ref) => {
  return (
    <ArkSlider.Root
      {...props}
      ref={ref}
      orientation={orientation}
      data-scope="slider"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    />
  );
});

LoongArkSliderRoot.displayName = "LoongArkSliderRoot";

export const LoongArkSliderLabel = forwardRef<
  HTMLLabelElement,
  LoongArkSliderLabelProps
>((props, ref) => {
  return (
    <ArkSlider.Label
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="label"
    />
  );
});

LoongArkSliderLabel.displayName = "LoongArkSliderLabel";

export const LoongArkSliderValueText = forwardRef<
  HTMLDivElement,
  LoongArkSliderValueTextProps
>((props, ref) => {
  return (
    <ArkSlider.ValueText
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="value-text"
    />
  );
});

LoongArkSliderValueText.displayName = "LoongArkSliderValueText";

export const LoongArkSliderControl = forwardRef<
  HTMLDivElement,
  LoongArkSliderControlProps
>((props, ref) => {
  return (
    <ArkSlider.Control
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="control"
    />
  );
});

LoongArkSliderControl.displayName = "LoongArkSliderControl";

export const LoongArkSliderTrack = forwardRef<
  HTMLDivElement,
  LoongArkSliderTrackProps
>((props, ref) => {
  return (
    <ArkSlider.Track
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="track"
    />
  );
});

LoongArkSliderTrack.displayName = "LoongArkSliderTrack";

export const LoongArkSliderRange = forwardRef<
  HTMLDivElement,
  LoongArkSliderRangeProps
>((props, ref) => {
  return (
    <ArkSlider.Range
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="range"
    />
  );
});

LoongArkSliderRange.displayName = "LoongArkSliderRange";

export const LoongArkSliderThumb = forwardRef<
  HTMLDivElement,
  LoongArkSliderThumbProps
>((props, ref) => {
  return (
    <ArkSlider.Thumb
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="thumb"
    />
  );
});

LoongArkSliderThumb.displayName = "LoongArkSliderThumb";

export const LoongArkSliderMarkerGroup = forwardRef<
  HTMLDivElement,
  LoongArkSliderMarkerGroupProps
>((props, ref) => {
  return (
    <ArkSlider.MarkerGroup
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="marker-group"
    />
  );
});

LoongArkSliderMarkerGroup.displayName = "LoongArkSliderMarkerGroup";

export const LoongArkSliderMarker = forwardRef<
  HTMLSpanElement,
  LoongArkSliderMarkerProps
>((props, ref) => {
  return (
    <ArkSlider.Marker
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="marker"
    />
  );
});

LoongArkSliderMarker.displayName = "LoongArkSliderMarker";

export const LoongArkSliderDraggingIndicator = forwardRef<
  HTMLSpanElement,
  LoongArkSliderDraggingIndicatorProps
>((props, ref) => {
  return (
    <ArkSlider.DraggingIndicator
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="dragging-indicator"
    />
  );
});

LoongArkSliderDraggingIndicator.displayName = "LoongArkSliderDraggingIndicator";

export const LoongArkSliderHiddenInput = forwardRef<
  HTMLInputElement,
  LoongArkSliderHiddenInputProps
>((props, ref) => {
  return (
    <ArkSlider.HiddenInput
      {...props}
      ref={ref}
      data-scope="slider"
      data-part="hidden-input"
    />
  );
});

LoongArkSliderHiddenInput.displayName = "LoongArkSliderHiddenInput";
