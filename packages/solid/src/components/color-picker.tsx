/**
 * Color Picker component - Solid wrapper.
 * Uses Ark UI Color Picker with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  ColorPicker as ArkColorPicker,
  type ColorPickerRootProps as ArkColorPickerRootProps,
  type ColorPickerLabelProps as ArkColorPickerLabelProps,
  type ColorPickerControlProps as ArkColorPickerControlProps,
  type ColorPickerTriggerProps as ArkColorPickerTriggerProps,
  type ColorPickerPositionerProps as ArkColorPickerPositionerProps,
  type ColorPickerContentProps as ArkColorPickerContentProps,
  type ColorPickerViewProps as ArkColorPickerViewProps,
  type ColorPickerAreaProps as ArkColorPickerAreaProps,
  type ColorPickerAreaBackgroundProps as ArkColorPickerAreaBackgroundProps,
  type ColorPickerAreaThumbProps as ArkColorPickerAreaThumbProps,
  type ColorPickerChannelSliderProps as ArkColorPickerChannelSliderProps,
  type ColorPickerChannelSliderLabelProps as ArkColorPickerChannelSliderLabelProps,
  type ColorPickerChannelSliderTrackProps as ArkColorPickerChannelSliderTrackProps,
  type ColorPickerChannelSliderThumbProps as ArkColorPickerChannelSliderThumbProps,
  type ColorPickerChannelSliderValueTextProps as ArkColorPickerChannelSliderValueTextProps,
  type ColorPickerChannelInputProps as ArkColorPickerChannelInputProps,
  type ColorPickerSwatchGroupProps as ArkColorPickerSwatchGroupProps,
  type ColorPickerSwatchTriggerProps as ArkColorPickerSwatchTriggerProps,
  type ColorPickerSwatchIndicatorProps as ArkColorPickerSwatchIndicatorProps,
  type ColorPickerSwatchProps as ArkColorPickerSwatchProps,
  type ColorPickerTransparencyGridProps as ArkColorPickerTransparencyGridProps,
  type ColorPickerValueTextProps as ArkColorPickerValueTextProps,
  type ColorPickerValueSwatchProps as ArkColorPickerValueSwatchProps,
  type ColorPickerEyeDropperTriggerProps as ArkColorPickerEyeDropperTriggerProps,
  type ColorPickerFormatTriggerProps as ArkColorPickerFormatTriggerProps,
  type ColorPickerFormatSelectProps as ArkColorPickerFormatSelectProps,
  type ColorPickerHiddenInputProps as ArkColorPickerHiddenInputProps,
} from "@ark-ui/solid/color-picker";
import type { ColorPickerSize } from "@loongark/primitives";

export interface LoongArkColorPickerRootProps extends Omit<
  ArkColorPickerRootProps,
  "asChild"
> {
  size?: ColorPickerSize;
  children?: JSX.Element;
}

export const LoongArkColorPickerRoot: Component<
  LoongArkColorPickerRootProps
> = (props) => {
  const merged = mergeProps({ size: "md" as ColorPickerSize }, props);
  const [local, others] = splitProps(merged, ["children", "size"]);

  return (
    <ArkColorPicker.Root
      {...others}
      data-scope="color-picker"
      data-part="root"
      data-size={local.size}
    >
      {local.children}
    </ArkColorPicker.Root>
  );
};

export interface LoongArkColorPickerLabelProps extends Omit<
  ArkColorPickerLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerLabel: Component<
  LoongArkColorPickerLabelProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.Label
      {...others}
      data-scope="color-picker"
      data-part="label"
    >
      {local.children}
    </ArkColorPicker.Label>
  );
};

export interface LoongArkColorPickerControlProps extends Omit<
  ArkColorPickerControlProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerControl: Component<
  LoongArkColorPickerControlProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.Control
      {...others}
      data-scope="color-picker"
      data-part="control"
    >
      {local.children}
    </ArkColorPicker.Control>
  );
};

export interface LoongArkColorPickerTriggerProps extends Omit<
  ArkColorPickerTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerTrigger: Component<
  LoongArkColorPickerTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.Trigger
      {...others}
      data-scope="color-picker"
      data-part="trigger"
    >
      {local.children}
    </ArkColorPicker.Trigger>
  );
};

export interface LoongArkColorPickerPositionerProps extends Omit<
  ArkColorPickerPositionerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerPositioner: Component<
  LoongArkColorPickerPositionerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.Positioner
      {...others}
      data-scope="color-picker"
      data-part="positioner"
    >
      {local.children}
    </ArkColorPicker.Positioner>
  );
};

export interface LoongArkColorPickerContentProps extends Omit<
  ArkColorPickerContentProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerContent: Component<
  LoongArkColorPickerContentProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.Content
      {...others}
      data-scope="color-picker"
      data-part="content"
    >
      {local.children}
    </ArkColorPicker.Content>
  );
};

export interface LoongArkColorPickerViewProps extends Omit<
  ArkColorPickerViewProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerView: Component<
  LoongArkColorPickerViewProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.View {...others} data-scope="color-picker" data-part="view">
      {local.children}
    </ArkColorPicker.View>
  );
};

export interface LoongArkColorPickerAreaProps extends Omit<
  ArkColorPickerAreaProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerArea: Component<
  LoongArkColorPickerAreaProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.Area {...others} data-scope="color-picker" data-part="area">
      {local.children}
    </ArkColorPicker.Area>
  );
};

export interface LoongArkColorPickerAreaBackgroundProps extends Omit<
  ArkColorPickerAreaBackgroundProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerAreaBackground: Component<
  LoongArkColorPickerAreaBackgroundProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.AreaBackground
      {...others}
      data-scope="color-picker"
      data-part="area-background"
    >
      {local.children}
    </ArkColorPicker.AreaBackground>
  );
};

export interface LoongArkColorPickerAreaThumbProps extends Omit<
  ArkColorPickerAreaThumbProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerAreaThumb: Component<
  LoongArkColorPickerAreaThumbProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.AreaThumb
      {...others}
      data-scope="color-picker"
      data-part="area-thumb"
    >
      {local.children}
    </ArkColorPicker.AreaThumb>
  );
};

export interface LoongArkColorPickerChannelSliderProps extends Omit<
  ArkColorPickerChannelSliderProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerChannelSlider: Component<
  LoongArkColorPickerChannelSliderProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.ChannelSlider
      {...others}
      data-scope="color-picker"
      data-part="channel-slider"
    >
      {local.children}
    </ArkColorPicker.ChannelSlider>
  );
};

export interface LoongArkColorPickerChannelSliderLabelProps extends Omit<
  ArkColorPickerChannelSliderLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerChannelSliderLabel: Component<
  LoongArkColorPickerChannelSliderLabelProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.ChannelSliderLabel
      {...others}
      data-scope="color-picker"
      data-part="channel-slider-label"
    >
      {local.children}
    </ArkColorPicker.ChannelSliderLabel>
  );
};

export interface LoongArkColorPickerChannelSliderTrackProps extends Omit<
  ArkColorPickerChannelSliderTrackProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerChannelSliderTrack: Component<
  LoongArkColorPickerChannelSliderTrackProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.ChannelSliderTrack
      {...others}
      data-scope="color-picker"
      data-part="channel-slider-track"
    >
      {local.children}
    </ArkColorPicker.ChannelSliderTrack>
  );
};

export interface LoongArkColorPickerChannelSliderThumbProps extends Omit<
  ArkColorPickerChannelSliderThumbProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerChannelSliderThumb: Component<
  LoongArkColorPickerChannelSliderThumbProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.ChannelSliderThumb
      {...others}
      data-scope="color-picker"
      data-part="channel-slider-thumb"
    >
      {local.children}
    </ArkColorPicker.ChannelSliderThumb>
  );
};

export interface LoongArkColorPickerChannelSliderValueTextProps extends Omit<
  ArkColorPickerChannelSliderValueTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerChannelSliderValueText: Component<
  LoongArkColorPickerChannelSliderValueTextProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.ChannelSliderValueText
      {...others}
      data-scope="color-picker"
      data-part="channel-slider-value-text"
    >
      {local.children}
    </ArkColorPicker.ChannelSliderValueText>
  );
};

export interface LoongArkColorPickerChannelInputProps extends Omit<
  ArkColorPickerChannelInputProps,
  "asChild"
> {}

export const LoongArkColorPickerChannelInput: Component<
  LoongArkColorPickerChannelInputProps
> = (props) => {
  return (
    <ArkColorPicker.ChannelInput
      {...props}
      data-scope="color-picker"
      data-part="channel-input"
    />
  );
};

export interface LoongArkColorPickerSwatchGroupProps extends Omit<
  ArkColorPickerSwatchGroupProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerSwatchGroup: Component<
  LoongArkColorPickerSwatchGroupProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.SwatchGroup
      {...others}
      data-scope="color-picker"
      data-part="swatch-group"
    >
      {local.children}
    </ArkColorPicker.SwatchGroup>
  );
};

export interface LoongArkColorPickerSwatchTriggerProps extends Omit<
  ArkColorPickerSwatchTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerSwatchTrigger: Component<
  LoongArkColorPickerSwatchTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.SwatchTrigger
      {...others}
      data-scope="color-picker"
      data-part="swatch-trigger"
    >
      {local.children}
    </ArkColorPicker.SwatchTrigger>
  );
};

export interface LoongArkColorPickerSwatchIndicatorProps extends Omit<
  ArkColorPickerSwatchIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerSwatchIndicator: Component<
  LoongArkColorPickerSwatchIndicatorProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.SwatchIndicator
      {...others}
      data-scope="color-picker"
      data-part="swatch-indicator"
    >
      {local.children}
    </ArkColorPicker.SwatchIndicator>
  );
};

export interface LoongArkColorPickerSwatchProps extends Omit<
  ArkColorPickerSwatchProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerSwatch: Component<
  LoongArkColorPickerSwatchProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.Swatch
      {...others}
      data-scope="color-picker"
      data-part="swatch"
    >
      {local.children}
    </ArkColorPicker.Swatch>
  );
};

export interface LoongArkColorPickerTransparencyGridProps extends Omit<
  ArkColorPickerTransparencyGridProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerTransparencyGrid: Component<
  LoongArkColorPickerTransparencyGridProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.TransparencyGrid
      {...others}
      data-scope="color-picker"
      data-part="transparency-grid"
    >
      {local.children}
    </ArkColorPicker.TransparencyGrid>
  );
};

export interface LoongArkColorPickerValueTextProps extends Omit<
  ArkColorPickerValueTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerValueText: Component<
  LoongArkColorPickerValueTextProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.ValueText
      {...others}
      data-scope="color-picker"
      data-part="value-text"
    >
      {local.children}
    </ArkColorPicker.ValueText>
  );
};

export interface LoongArkColorPickerValueSwatchProps extends Omit<
  ArkColorPickerValueSwatchProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerValueSwatch: Component<
  LoongArkColorPickerValueSwatchProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.ValueSwatch
      {...others}
      data-scope="color-picker"
      data-part="value-swatch"
    >
      {local.children}
    </ArkColorPicker.ValueSwatch>
  );
};

export interface LoongArkColorPickerEyeDropperTriggerProps extends Omit<
  ArkColorPickerEyeDropperTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerEyeDropperTrigger: Component<
  LoongArkColorPickerEyeDropperTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.EyeDropperTrigger
      {...others}
      data-scope="color-picker"
      data-part="eye-dropper-trigger"
    >
      {local.children}
    </ArkColorPicker.EyeDropperTrigger>
  );
};

export interface LoongArkColorPickerFormatTriggerProps extends Omit<
  ArkColorPickerFormatTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerFormatTrigger: Component<
  LoongArkColorPickerFormatTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.FormatTrigger
      {...others}
      data-scope="color-picker"
      data-part="format-trigger"
    >
      {local.children}
    </ArkColorPicker.FormatTrigger>
  );
};

export interface LoongArkColorPickerFormatSelectProps extends Omit<
  ArkColorPickerFormatSelectProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkColorPickerFormatSelect: Component<
  LoongArkColorPickerFormatSelectProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkColorPicker.FormatSelect
      {...others}
      data-scope="color-picker"
      data-part="format-select"
    >
      {local.children}
    </ArkColorPicker.FormatSelect>
  );
};

export interface LoongArkColorPickerHiddenInputProps extends Omit<
  ArkColorPickerHiddenInputProps,
  "asChild"
> {}

export const LoongArkColorPickerHiddenInput: Component<
  LoongArkColorPickerHiddenInputProps
> = (props) => {
  return (
    <ArkColorPicker.HiddenInput
      {...props}
      data-scope="color-picker"
      data-part="hidden-input"
    />
  );
};
