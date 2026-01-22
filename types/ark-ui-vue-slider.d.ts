declare module "@ark-ui/vue/slider" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

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
  }

  export interface SliderLabelProps {
    id?: string;
  }

  export interface SliderValueTextProps {
    id?: string;
  }

  export interface SliderControlProps {
    id?: string;
  }

  export interface SliderTrackProps {
    id?: string;
  }

  export interface SliderRangeProps {
    id?: string;
  }

  export interface SliderThumbProps {
    index: number;
    name?: string;
    id?: string;
  }

  export interface SliderMarkerGroupProps {
    id?: string;
  }

  export interface SliderMarkerProps {
    value: number;
    id?: string;
  }

  export interface SliderDraggingIndicatorProps {
    id?: string;
  }

  export interface SliderHiddenInputProps {
    id?: string;
  }

  export const Slider: {
    Root: VueComponent<SliderRootProps>;
    Label: VueComponent<SliderLabelProps>;
    ValueText: VueComponent<SliderValueTextProps>;
    Control: VueComponent<SliderControlProps>;
    Track: VueComponent<SliderTrackProps>;
    Range: VueComponent<SliderRangeProps>;
    Thumb: VueComponent<SliderThumbProps>;
    MarkerGroup: VueComponent<SliderMarkerGroupProps>;
    Marker: VueComponent<SliderMarkerProps>;
    DraggingIndicator: VueComponent<SliderDraggingIndicatorProps>;
    HiddenInput: VueComponent<SliderHiddenInputProps>;
  };
}
