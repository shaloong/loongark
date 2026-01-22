declare module "@ark-ui/svelte/slider" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface SliderRootProps {
    value?: number[];
    defaultValue?: number[];
    min?: number;
    max?: number;
    step?: number;
    minStepsBetweenThumbs?: number;
    orientation?: "horizontal" | "vertical";
    origin?: "start" | "center" | "end";
    thumbAlignment?: "contain" | "center";
    thumbSize?: { width: number; height: number };
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    id?: string;
    ids?: any;
    onValueChange?: (details: { value: number[] }) => void;
    onValueChangeEnd?: (details: { value: number[] }) => void;
    onFocusChange?: (details: { focusedIndex: number; value: number[] }) => void;
    getAriaValueText?: (details: { value: number; index: number }) => string;
    asChild?: boolean;
  }

  export interface SliderLabelProps {
    id?: string;
    asChild?: boolean;
  }

  export interface SliderValueTextProps {
    id?: string;
    asChild?: boolean;
  }

  export interface SliderControlProps {
    id?: string;
    asChild?: boolean;
  }

  export interface SliderTrackProps {
    id?: string;
    asChild?: boolean;
  }

  export interface SliderRangeProps {
    id?: string;
    asChild?: boolean;
  }

  export interface SliderThumbProps {
    index: number;
    name?: string;
    id?: string;
    asChild?: boolean;
  }

  export interface SliderMarkerGroupProps {
    id?: string;
    asChild?: boolean;
  }

  export interface SliderMarkerProps {
    value: number;
    id?: string;
    asChild?: boolean;
  }

  export interface SliderDraggingIndicatorProps {
    id?: string;
    asChild?: boolean;
  }

  export interface SliderHiddenInputProps {
    id?: string;
    asChild?: boolean;
  }

  export const Slider: {
    Root: SvelteComponent<SliderRootProps>;
    Label: SvelteComponent<SliderLabelProps>;
    ValueText: SvelteComponent<SliderValueTextProps>;
    Control: SvelteComponent<SliderControlProps>;
    Track: SvelteComponent<SliderTrackProps>;
    Range: SvelteComponent<SliderRangeProps>;
    Thumb: SvelteComponent<SliderThumbProps>;
    MarkerGroup: SvelteComponent<SliderMarkerGroupProps>;
    Marker: SvelteComponent<SliderMarkerProps>;
    DraggingIndicator: SvelteComponent<SliderDraggingIndicatorProps>;
    HiddenInput: SvelteComponent<SliderHiddenInputProps>;
  };
}
