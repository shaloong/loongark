declare module "@ark-ui/solid/color-picker" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
  };

  export interface ColorPickerRootProps extends BaseProps {}
  export interface ColorPickerLabelProps extends BaseProps {}
  export interface ColorPickerControlProps extends BaseProps {}
  export interface ColorPickerTriggerProps extends BaseProps {}
  export interface ColorPickerPositionerProps extends BaseProps {}
  export interface ColorPickerContentProps extends BaseProps {}
  export interface ColorPickerViewProps extends BaseProps {}
  export interface ColorPickerAreaProps extends BaseProps {}
  export interface ColorPickerAreaBackgroundProps extends BaseProps {}
  export interface ColorPickerAreaThumbProps extends BaseProps {}
  export interface ColorPickerChannelSliderProps extends BaseProps {}
  export interface ColorPickerChannelSliderLabelProps extends BaseProps {}
  export interface ColorPickerChannelSliderTrackProps extends BaseProps {}
  export interface ColorPickerChannelSliderThumbProps extends BaseProps {}
  export interface ColorPickerChannelSliderValueTextProps extends BaseProps {}
  export interface ColorPickerChannelInputProps extends BaseProps {}
  export interface ColorPickerSwatchGroupProps extends BaseProps {}
  export interface ColorPickerSwatchTriggerProps extends BaseProps {}
  export interface ColorPickerSwatchIndicatorProps extends BaseProps {}
  export interface ColorPickerSwatchProps extends BaseProps {}
  export interface ColorPickerTransparencyGridProps extends BaseProps {}
  export interface ColorPickerValueTextProps extends BaseProps {}
  export interface ColorPickerValueSwatchProps extends BaseProps {}
  export interface ColorPickerEyeDropperTriggerProps extends BaseProps {}
  export interface ColorPickerFormatTriggerProps extends BaseProps {}
  export interface ColorPickerFormatSelectProps extends BaseProps {}
  export interface ColorPickerHiddenInputProps extends BaseProps {}

  export namespace ColorPicker {
    export const Root: Component<ColorPickerRootProps>;
    export const Label: Component<ColorPickerLabelProps>;
    export const Control: Component<ColorPickerControlProps>;
    export const Trigger: Component<ColorPickerTriggerProps>;
    export const Positioner: Component<ColorPickerPositionerProps>;
    export const Content: Component<ColorPickerContentProps>;
    export const View: Component<ColorPickerViewProps>;
    export const Area: Component<ColorPickerAreaProps>;
    export const AreaBackground: Component<ColorPickerAreaBackgroundProps>;
    export const AreaThumb: Component<ColorPickerAreaThumbProps>;
    export const ChannelSlider: Component<ColorPickerChannelSliderProps>;
    export const ChannelSliderLabel: Component<ColorPickerChannelSliderLabelProps>;
    export const ChannelSliderTrack: Component<ColorPickerChannelSliderTrackProps>;
    export const ChannelSliderThumb: Component<ColorPickerChannelSliderThumbProps>;
    export const ChannelSliderValueText: Component<ColorPickerChannelSliderValueTextProps>;
    export const ChannelInput: Component<ColorPickerChannelInputProps>;
    export const SwatchGroup: Component<ColorPickerSwatchGroupProps>;
    export const SwatchTrigger: Component<ColorPickerSwatchTriggerProps>;
    export const SwatchIndicator: Component<ColorPickerSwatchIndicatorProps>;
    export const Swatch: Component<ColorPickerSwatchProps>;
    export const TransparencyGrid: Component<ColorPickerTransparencyGridProps>;
    export const ValueText: Component<ColorPickerValueTextProps>;
    export const ValueSwatch: Component<ColorPickerValueSwatchProps>;
    export const EyeDropperTrigger: Component<ColorPickerEyeDropperTriggerProps>;
    export const FormatTrigger: Component<ColorPickerFormatTriggerProps>;
    export const FormatSelect: Component<ColorPickerFormatSelectProps>;
    export const HiddenInput: Component<ColorPickerHiddenInputProps>;
  }
}
