declare module "@ark-ui/vue/color-picker" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface ColorPickerRootProps {}
  export interface ColorPickerLabelProps {}
  export interface ColorPickerControlProps {}
  export interface ColorPickerTriggerProps {}
  export interface ColorPickerPositionerProps {}
  export interface ColorPickerContentProps {}
  export interface ColorPickerViewProps {}
  export interface ColorPickerAreaProps {}
  export interface ColorPickerAreaBackgroundProps {}
  export interface ColorPickerAreaThumbProps {}
  export interface ColorPickerChannelSliderProps {}
  export interface ColorPickerChannelSliderLabelProps {}
  export interface ColorPickerChannelSliderTrackProps {}
  export interface ColorPickerChannelSliderThumbProps {}
  export interface ColorPickerChannelSliderValueTextProps {}
  export interface ColorPickerChannelInputProps {}
  export interface ColorPickerSwatchGroupProps {}
  export interface ColorPickerSwatchTriggerProps {}
  export interface ColorPickerSwatchIndicatorProps {}
  export interface ColorPickerSwatchProps {}
  export interface ColorPickerTransparencyGridProps {}
  export interface ColorPickerValueTextProps {}
  export interface ColorPickerValueSwatchProps {}
  export interface ColorPickerEyeDropperTriggerProps {}
  export interface ColorPickerFormatTriggerProps {}
  export interface ColorPickerFormatSelectProps {}
  export interface ColorPickerHiddenInputProps {}

  export const ColorPicker: {
    Root: VueComponent<ColorPickerRootProps>;
    Label: VueComponent<ColorPickerLabelProps>;
    Control: VueComponent<ColorPickerControlProps>;
    Trigger: VueComponent<ColorPickerTriggerProps>;
    Positioner: VueComponent<ColorPickerPositionerProps>;
    Content: VueComponent<ColorPickerContentProps>;
    View: VueComponent<ColorPickerViewProps>;
    Area: VueComponent<ColorPickerAreaProps>;
    AreaBackground: VueComponent<ColorPickerAreaBackgroundProps>;
    AreaThumb: VueComponent<ColorPickerAreaThumbProps>;
    ChannelSlider: VueComponent<ColorPickerChannelSliderProps>;
    ChannelSliderLabel: VueComponent<ColorPickerChannelSliderLabelProps>;
    ChannelSliderTrack: VueComponent<ColorPickerChannelSliderTrackProps>;
    ChannelSliderThumb: VueComponent<ColorPickerChannelSliderThumbProps>;
    ChannelSliderValueText: VueComponent<ColorPickerChannelSliderValueTextProps>;
    ChannelInput: VueComponent<ColorPickerChannelInputProps>;
    SwatchGroup: VueComponent<ColorPickerSwatchGroupProps>;
    SwatchTrigger: VueComponent<ColorPickerSwatchTriggerProps>;
    SwatchIndicator: VueComponent<ColorPickerSwatchIndicatorProps>;
    Swatch: VueComponent<ColorPickerSwatchProps>;
    TransparencyGrid: VueComponent<ColorPickerTransparencyGridProps>;
    ValueText: VueComponent<ColorPickerValueTextProps>;
    ValueSwatch: VueComponent<ColorPickerValueSwatchProps>;
    EyeDropperTrigger: VueComponent<ColorPickerEyeDropperTriggerProps>;
    FormatTrigger: VueComponent<ColorPickerFormatTriggerProps>;
    FormatSelect: VueComponent<ColorPickerFormatSelectProps>;
    HiddenInput: VueComponent<ColorPickerHiddenInputProps>;
  };
}
