"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";


/**
 * Color Picker component - React wrapper.
 * Uses Ark UI Color Picker with data attributes for styling.
 */
import React, { forwardRef, createElement } from "react";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { ColorPicker } from "@ark-ui/react/color-picker";
import { Portal as ArkPortal } from "./portal";
import type { ColorPickerSize } from "@shaloong/loongark-primitives";

type ArkColorPickerRootProps = ComponentPropsWithoutRef<
  typeof ColorPicker.Root
>;
type ArkColorPickerLabelProps = ComponentPropsWithoutRef<
  typeof ColorPicker.Label
>;
type ArkColorPickerControlProps = ComponentPropsWithoutRef<
  typeof ColorPicker.Control
>;
type ArkColorPickerTriggerProps = ComponentPropsWithoutRef<
  typeof ColorPicker.Trigger
>;
type ArkColorPickerPositionerProps = ComponentPropsWithoutRef<
  typeof ColorPicker.Positioner
>;
type ArkColorPickerContentProps = ComponentPropsWithoutRef<
  typeof ColorPicker.Content
>;
type ArkColorPickerViewProps = ComponentPropsWithoutRef<
  typeof ColorPicker.View
>;
type ArkColorPickerAreaProps = ComponentPropsWithoutRef<
  typeof ColorPicker.Area
>;
type ArkColorPickerAreaBackgroundProps = ComponentPropsWithoutRef<
  typeof ColorPicker.AreaBackground
>;
type ArkColorPickerAreaThumbProps = ComponentPropsWithoutRef<
  typeof ColorPicker.AreaThumb
>;
type ArkColorPickerChannelSliderProps = ComponentPropsWithoutRef<
  typeof ColorPicker.ChannelSlider
>;
type ArkColorPickerChannelSliderLabelProps = ComponentPropsWithoutRef<
  typeof ColorPicker.ChannelSliderLabel
>;
type ArkColorPickerChannelSliderTrackProps = ComponentPropsWithoutRef<
  typeof ColorPicker.ChannelSliderTrack
>;
type ArkColorPickerChannelSliderThumbProps = ComponentPropsWithoutRef<
  typeof ColorPicker.ChannelSliderThumb
>;
type ArkColorPickerChannelSliderValueTextProps = ComponentPropsWithoutRef<
  typeof ColorPicker.ChannelSliderValueText
>;
type ArkColorPickerChannelInputProps = ComponentPropsWithoutRef<
  typeof ColorPicker.ChannelInput
>;
type ArkColorPickerSwatchGroupProps = ComponentPropsWithoutRef<
  typeof ColorPicker.SwatchGroup
>;
type ArkColorPickerSwatchTriggerProps = ComponentPropsWithoutRef<
  typeof ColorPicker.SwatchTrigger
>;
type ArkColorPickerSwatchIndicatorProps = ComponentPropsWithoutRef<
  typeof ColorPicker.SwatchIndicator
>;
type ArkColorPickerSwatchProps = ComponentPropsWithoutRef<
  typeof ColorPicker.Swatch
>;
type ArkColorPickerTransparencyGridProps = ComponentPropsWithoutRef<
  typeof ColorPicker.TransparencyGrid
>;
type ArkColorPickerValueTextProps = ComponentPropsWithoutRef<
  typeof ColorPicker.ValueText
>;
type ArkColorPickerValueSwatchProps = ComponentPropsWithoutRef<
  typeof ColorPicker.ValueSwatch
>;
type ArkColorPickerEyeDropperTriggerProps = ComponentPropsWithoutRef<
  typeof ColorPicker.EyeDropperTrigger
>;
type ArkColorPickerFormatTriggerProps = ComponentPropsWithoutRef<
  typeof ColorPicker.FormatTrigger
>;
type ArkColorPickerFormatSelectProps = ComponentPropsWithoutRef<
  typeof ColorPicker.FormatSelect
>;
type ArkColorPickerHiddenInputProps = ComponentPropsWithoutRef<
  typeof ColorPicker.HiddenInput
>;

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

export interface LoongArkColorPickerRootProps extends Omit<
  ArkColorPickerRootProps,
  "asChild"
> {
  size?: ColorPickerSize;
  children?: ReactNode;
}

export const LoongArkColorPickerRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkColorPickerRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <ColorPicker.Root
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="root"
      data-size={size}
    >
      {children}
    </ColorPicker.Root>
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerRoot.displayName = "LoongArkColorPickerRoot";

export const LoongArkColorPickerLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLLabelElement,
  ArkColorPickerLabelProps
>((props, ref) => {
  return (
    <ColorPicker.Label
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="label"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerLabel.displayName = "LoongArkColorPickerLabel";

export const LoongArkColorPickerControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerControlProps
>((props, ref) => {
  return (
    <ColorPicker.Control
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="control"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerControl.displayName = "LoongArkColorPickerControl";

export const LoongArkColorPickerTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkColorPickerTriggerProps
>((props, ref) => {
  return (
    <ColorPicker.Trigger
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="trigger"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerTrigger.displayName = "LoongArkColorPickerTrigger";

export const LoongArkColorPickerPositioner = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkColorPickerPositionerProps, "asChild">
>((props, ref) => {
  return (
    <SafePortal>
      <ColorPicker.Positioner
        {...props}
        ref={ref}
        data-scope="color-picker"
        data-part="positioner"
      />
    </SafePortal>
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerPositioner.displayName = "LoongArkColorPickerPositioner";

export const LoongArkColorPickerContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkColorPickerContentProps, "asChild">
>((props, ref) => {
  return (
    <ColorPicker.Content
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="content"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerContent.displayName = "LoongArkColorPickerContent";

export const LoongArkColorPickerView = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerViewProps
>((props, ref) => {
  return (
    <ColorPicker.View
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="view"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerView.displayName = "LoongArkColorPickerView";

export const LoongArkColorPickerArea = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerAreaProps
>((props, ref) => {
  return (
    <ColorPicker.Area
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="area"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerArea.displayName = "LoongArkColorPickerArea";

export const LoongArkColorPickerAreaBackground = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerAreaBackgroundProps
>((props, ref) => {
  return (
    <ColorPicker.AreaBackground
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="area-background"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerAreaBackground.displayName =
  "LoongArkColorPickerAreaBackground";

export const LoongArkColorPickerAreaThumb = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerAreaThumbProps
>((props, ref) => {
  return (
    <ColorPicker.AreaThumb
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="area-thumb"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerAreaThumb.displayName = "LoongArkColorPickerAreaThumb";

export const LoongArkColorPickerChannelSlider = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerChannelSliderProps
>((props, ref) => {
  return (
    <ColorPicker.ChannelSlider
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="channel-slider"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerChannelSlider.displayName =
  "LoongArkColorPickerChannelSlider";

export const LoongArkColorPickerChannelSliderLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLLabelElement,
  ArkColorPickerChannelSliderLabelProps
>((props, ref) => {
  return (
    <ColorPicker.ChannelSliderLabel
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="channel-slider-label"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerChannelSliderLabel.displayName =
  "LoongArkColorPickerChannelSliderLabel";

export const LoongArkColorPickerChannelSliderTrack = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerChannelSliderTrackProps
>((props, ref) => {
  return (
    <ColorPicker.ChannelSliderTrack
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="channel-slider-track"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerChannelSliderTrack.displayName =
  "LoongArkColorPickerChannelSliderTrack";

export const LoongArkColorPickerChannelSliderThumb = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerChannelSliderThumbProps
>((props, ref) => {
  return (
    <ColorPicker.ChannelSliderThumb
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="channel-slider-thumb"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerChannelSliderThumb.displayName =
  "LoongArkColorPickerChannelSliderThumb";

export const LoongArkColorPickerChannelSliderValueText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLSpanElement,
  ArkColorPickerChannelSliderValueTextProps
>((props, ref) => {
  return (
    <ColorPicker.ChannelSliderValueText
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="channel-slider-value-text"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerChannelSliderValueText.displayName =
  "LoongArkColorPickerChannelSliderValueText";

export const LoongArkColorPickerChannelInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLInputElement,
  ArkColorPickerChannelInputProps
>((props, ref) => {
  return (
    <ColorPicker.ChannelInput
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="channel-input"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerChannelInput.displayName = "LoongArkColorPickerChannelInput";

export const LoongArkColorPickerSwatchGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerSwatchGroupProps
>((props, ref) => {
  return (
    <ColorPicker.SwatchGroup
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="swatch-group"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerSwatchGroup.displayName = "LoongArkColorPickerSwatchGroup";

export const LoongArkColorPickerSwatchTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkColorPickerSwatchTriggerProps
>((props, ref) => {
  return (
    <ColorPicker.SwatchTrigger
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="swatch-trigger"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerSwatchTrigger.displayName =
  "LoongArkColorPickerSwatchTrigger";

export const LoongArkColorPickerSwatchIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerSwatchIndicatorProps
>((props, ref) => {
  return (
    <ColorPicker.SwatchIndicator
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="swatch-indicator"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerSwatchIndicator.displayName =
  "LoongArkColorPickerSwatchIndicator";

export const LoongArkColorPickerSwatch = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerSwatchProps
>((props, ref) => {
  return (
    <ColorPicker.Swatch
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="swatch"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerSwatch.displayName = "LoongArkColorPickerSwatch";

export const LoongArkColorPickerTransparencyGrid = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerTransparencyGridProps
>((props, ref) => {
  return (
    <ColorPicker.TransparencyGrid
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="transparency-grid"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerTransparencyGrid.displayName =
  "LoongArkColorPickerTransparencyGrid";

export const LoongArkColorPickerValueText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerValueTextProps
>((props, ref) => {
  return (
    <ColorPicker.ValueText
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="value-text"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerValueText.displayName = "LoongArkColorPickerValueText";

export const LoongArkColorPickerValueSwatch = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkColorPickerValueSwatchProps
>((props, ref) => {
  return (
    <ColorPicker.ValueSwatch
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="value-swatch"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerValueSwatch.displayName = "LoongArkColorPickerValueSwatch";

export const LoongArkColorPickerEyeDropperTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkColorPickerEyeDropperTriggerProps
>((props, ref) => {
  return (
    <ColorPicker.EyeDropperTrigger
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="eye-dropper-trigger"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerEyeDropperTrigger.displayName =
  "LoongArkColorPickerEyeDropperTrigger";

export const LoongArkColorPickerFormatTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkColorPickerFormatTriggerProps
>((props, ref) => {
  return (
    <ColorPicker.FormatTrigger
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="format-trigger"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerFormatTrigger.displayName =
  "LoongArkColorPickerFormatTrigger";

export const LoongArkColorPickerFormatSelect = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLSelectElement,
  ArkColorPickerFormatSelectProps
>((props, ref) => {
  return (
    <ColorPicker.FormatSelect
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="format-select"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerFormatSelect.displayName = "LoongArkColorPickerFormatSelect";

export const LoongArkColorPickerHiddenInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLInputElement,
  ArkColorPickerHiddenInputProps
>((props, ref) => {
  return (
    <ColorPicker.HiddenInput
      {...props}
      ref={ref}
      data-scope="color-picker"
      data-part="hidden-input"
    />
  );
}), lkAutomaticColorPickerStyles);

LoongArkColorPickerHiddenInput.displayName = "LoongArkColorPickerHiddenInput";
