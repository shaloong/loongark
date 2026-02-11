declare module "@ark-ui/react/color-picker" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
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
    export const Root: React.FC<ColorPickerRootProps>;
    export const Label: React.FC<ColorPickerLabelProps>;
    export const Control: React.FC<ColorPickerControlProps>;
    export const Trigger: React.FC<ColorPickerTriggerProps>;
    export const Positioner: React.FC<ColorPickerPositionerProps>;
    export const Content: React.FC<ColorPickerContentProps>;
    export const View: React.FC<ColorPickerViewProps>;
    export const Area: React.FC<ColorPickerAreaProps>;
    export const AreaBackground: React.FC<ColorPickerAreaBackgroundProps>;
    export const AreaThumb: React.FC<ColorPickerAreaThumbProps>;
    export const ChannelSlider: React.FC<ColorPickerChannelSliderProps>;
    export const ChannelSliderLabel: React.FC<ColorPickerChannelSliderLabelProps>;
    export const ChannelSliderTrack: React.FC<ColorPickerChannelSliderTrackProps>;
    export const ChannelSliderThumb: React.FC<ColorPickerChannelSliderThumbProps>;
    export const ChannelSliderValueText: React.FC<ColorPickerChannelSliderValueTextProps>;
    export const ChannelInput: React.FC<ColorPickerChannelInputProps>;
    export const SwatchGroup: React.FC<ColorPickerSwatchGroupProps>;
    export const SwatchTrigger: React.FC<ColorPickerSwatchTriggerProps>;
    export const SwatchIndicator: React.FC<ColorPickerSwatchIndicatorProps>;
    export const Swatch: React.FC<ColorPickerSwatchProps>;
    export const TransparencyGrid: React.FC<ColorPickerTransparencyGridProps>;
    export const ValueText: React.FC<ColorPickerValueTextProps>;
    export const ValueSwatch: React.FC<ColorPickerValueSwatchProps>;
    export const EyeDropperTrigger: React.FC<ColorPickerEyeDropperTriggerProps>;
    export const FormatTrigger: React.FC<ColorPickerFormatTriggerProps>;
    export const FormatSelect: React.FC<ColorPickerFormatSelectProps>;
    export const HiddenInput: React.FC<ColorPickerHiddenInputProps>;
  }
}
