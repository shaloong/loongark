/**
 * Color Picker component - React wrapper.
 * Uses Ark UI Color Picker with data attributes for styling.
 */
import React, { forwardRef, createElement } from "react";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { ColorPicker } from "@ark-ui/react/color-picker";
import { Portal as ArkPortal } from "@ark-ui/react/portal";
import type { ColorPickerSize } from "@loongark/primitives";

type ArkColorPickerRootProps = ComponentPropsWithoutRef<typeof ColorPicker.Root>;
type ArkColorPickerLabelProps = ComponentPropsWithoutRef<typeof ColorPicker.Label>;
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
type ArkColorPickerViewProps = ComponentPropsWithoutRef<typeof ColorPicker.View>;
type ArkColorPickerAreaProps = ComponentPropsWithoutRef<typeof ColorPicker.Area>;
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
  createElement(ArkPortal as unknown as FC<{ children?: ReactNode }>, null, children);

export interface LoongArkColorPickerRootProps
  extends Omit<ArkColorPickerRootProps, "asChild"> {
  size?: ColorPickerSize;
  children?: ReactNode;
}

export const LoongArkColorPickerRoot = forwardRef<
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
});

LoongArkColorPickerRoot.displayName = "LoongArkColorPickerRoot";

export const LoongArkColorPickerLabel = forwardRef<
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
});

LoongArkColorPickerLabel.displayName = "LoongArkColorPickerLabel";

export const LoongArkColorPickerControl = forwardRef<
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
});

LoongArkColorPickerControl.displayName = "LoongArkColorPickerControl";

export const LoongArkColorPickerTrigger = forwardRef<
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
});

LoongArkColorPickerTrigger.displayName = "LoongArkColorPickerTrigger";

export const LoongArkColorPickerPositioner = forwardRef<
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
});

LoongArkColorPickerPositioner.displayName = "LoongArkColorPickerPositioner";

export const LoongArkColorPickerContent = forwardRef<
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
});

LoongArkColorPickerContent.displayName = "LoongArkColorPickerContent";

export const LoongArkColorPickerView = forwardRef<
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
});

LoongArkColorPickerView.displayName = "LoongArkColorPickerView";

export const LoongArkColorPickerArea = forwardRef<
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
});

LoongArkColorPickerArea.displayName = "LoongArkColorPickerArea";

export const LoongArkColorPickerAreaBackground = forwardRef<
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
});

LoongArkColorPickerAreaBackground.displayName =
  "LoongArkColorPickerAreaBackground";

export const LoongArkColorPickerAreaThumb = forwardRef<
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
});

LoongArkColorPickerAreaThumb.displayName = "LoongArkColorPickerAreaThumb";

export const LoongArkColorPickerChannelSlider = forwardRef<
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
});

LoongArkColorPickerChannelSlider.displayName =
  "LoongArkColorPickerChannelSlider";

export const LoongArkColorPickerChannelSliderLabel = forwardRef<
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
});

LoongArkColorPickerChannelSliderLabel.displayName =
  "LoongArkColorPickerChannelSliderLabel";

export const LoongArkColorPickerChannelSliderTrack = forwardRef<
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
});

LoongArkColorPickerChannelSliderTrack.displayName =
  "LoongArkColorPickerChannelSliderTrack";

export const LoongArkColorPickerChannelSliderThumb = forwardRef<
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
});

LoongArkColorPickerChannelSliderThumb.displayName =
  "LoongArkColorPickerChannelSliderThumb";

export const LoongArkColorPickerChannelSliderValueText = forwardRef<
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
});

LoongArkColorPickerChannelSliderValueText.displayName =
  "LoongArkColorPickerChannelSliderValueText";

export const LoongArkColorPickerChannelInput = forwardRef<
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
});

LoongArkColorPickerChannelInput.displayName = "LoongArkColorPickerChannelInput";

export const LoongArkColorPickerSwatchGroup = forwardRef<
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
});

LoongArkColorPickerSwatchGroup.displayName = "LoongArkColorPickerSwatchGroup";

export const LoongArkColorPickerSwatchTrigger = forwardRef<
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
});

LoongArkColorPickerSwatchTrigger.displayName =
  "LoongArkColorPickerSwatchTrigger";

export const LoongArkColorPickerSwatchIndicator = forwardRef<
  HTMLSpanElement,
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
});

LoongArkColorPickerSwatchIndicator.displayName =
  "LoongArkColorPickerSwatchIndicator";

export const LoongArkColorPickerSwatch = forwardRef<
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
});

LoongArkColorPickerSwatch.displayName = "LoongArkColorPickerSwatch";

export const LoongArkColorPickerTransparencyGrid = forwardRef<
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
});

LoongArkColorPickerTransparencyGrid.displayName =
  "LoongArkColorPickerTransparencyGrid";

export const LoongArkColorPickerValueText = forwardRef<
  HTMLSpanElement,
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
});

LoongArkColorPickerValueText.displayName = "LoongArkColorPickerValueText";

export const LoongArkColorPickerValueSwatch = forwardRef<
  HTMLSpanElement,
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
});

LoongArkColorPickerValueSwatch.displayName = "LoongArkColorPickerValueSwatch";

export const LoongArkColorPickerEyeDropperTrigger = forwardRef<
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
});

LoongArkColorPickerEyeDropperTrigger.displayName =
  "LoongArkColorPickerEyeDropperTrigger";

export const LoongArkColorPickerFormatTrigger = forwardRef<
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
});

LoongArkColorPickerFormatTrigger.displayName =
  "LoongArkColorPickerFormatTrigger";

export const LoongArkColorPickerFormatSelect = forwardRef<
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
});

LoongArkColorPickerFormatSelect.displayName =
  "LoongArkColorPickerFormatSelect";

export const LoongArkColorPickerHiddenInput = forwardRef<
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
});

LoongArkColorPickerHiddenInput.displayName =
  "LoongArkColorPickerHiddenInput";
