declare module "@ark-ui/svelte/color-picker" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface ColorPickerRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerLabelProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerControlProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerPositionerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerContentProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerViewProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerAreaProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerAreaBackgroundProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerAreaThumbProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerChannelSliderProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerChannelSliderLabelProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerChannelSliderTrackProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerChannelSliderThumbProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerChannelSliderValueTextProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerChannelInputProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerSwatchGroupProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerSwatchTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerSwatchIndicatorProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerSwatchProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerTransparencyGridProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerValueTextProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerValueSwatchProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerEyeDropperTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerFormatTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerFormatSelectProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ColorPickerHiddenInputProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const ColorPicker: {
    Root: SvelteComponent<ColorPickerRootProps>;
    Label: SvelteComponent<ColorPickerLabelProps>;
    Control: SvelteComponent<ColorPickerControlProps>;
    Trigger: SvelteComponent<ColorPickerTriggerProps>;
    Positioner: SvelteComponent<ColorPickerPositionerProps>;
    Content: SvelteComponent<ColorPickerContentProps>;
    View: SvelteComponent<ColorPickerViewProps>;
    Area: SvelteComponent<ColorPickerAreaProps>;
    AreaBackground: SvelteComponent<ColorPickerAreaBackgroundProps>;
    AreaThumb: SvelteComponent<ColorPickerAreaThumbProps>;
    ChannelSlider: SvelteComponent<ColorPickerChannelSliderProps>;
    ChannelSliderLabel: SvelteComponent<ColorPickerChannelSliderLabelProps>;
    ChannelSliderTrack: SvelteComponent<ColorPickerChannelSliderTrackProps>;
    ChannelSliderThumb: SvelteComponent<ColorPickerChannelSliderThumbProps>;
    ChannelSliderValueText: SvelteComponent<ColorPickerChannelSliderValueTextProps>;
    ChannelInput: SvelteComponent<ColorPickerChannelInputProps>;
    SwatchGroup: SvelteComponent<ColorPickerSwatchGroupProps>;
    SwatchTrigger: SvelteComponent<ColorPickerSwatchTriggerProps>;
    SwatchIndicator: SvelteComponent<ColorPickerSwatchIndicatorProps>;
    Swatch: SvelteComponent<ColorPickerSwatchProps>;
    TransparencyGrid: SvelteComponent<ColorPickerTransparencyGridProps>;
    ValueText: SvelteComponent<ColorPickerValueTextProps>;
    ValueSwatch: SvelteComponent<ColorPickerValueSwatchProps>;
    EyeDropperTrigger: SvelteComponent<ColorPickerEyeDropperTriggerProps>;
    FormatTrigger: SvelteComponent<ColorPickerFormatTriggerProps>;
    FormatSelect: SvelteComponent<ColorPickerFormatSelectProps>;
    HiddenInput: SvelteComponent<ColorPickerHiddenInputProps>;
  };
}
