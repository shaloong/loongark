"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticSliderStyles } from "@loongark/primitives/automatic-styles/slider";


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

export const LoongArkSliderRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderRoot.displayName = "LoongArkSliderRoot";

export const LoongArkSliderLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderLabel.displayName = "LoongArkSliderLabel";

export const LoongArkSliderValueText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderValueText.displayName = "LoongArkSliderValueText";

export const LoongArkSliderControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderControl.displayName = "LoongArkSliderControl";

export const LoongArkSliderTrack = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderTrack.displayName = "LoongArkSliderTrack";

export const LoongArkSliderRange = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderRange.displayName = "LoongArkSliderRange";

export const LoongArkSliderThumb = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderThumb.displayName = "LoongArkSliderThumb";

export const LoongArkSliderMarkerGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderMarkerGroup.displayName = "LoongArkSliderMarkerGroup";

export const LoongArkSliderMarker = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderMarker.displayName = "LoongArkSliderMarker";

export const LoongArkSliderDraggingIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderDraggingIndicator.displayName = "LoongArkSliderDraggingIndicator";

export const LoongArkSliderHiddenInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticSliderStyles);

LoongArkSliderHiddenInput.displayName = "LoongArkSliderHiddenInput";
