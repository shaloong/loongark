declare module "@ark-ui/solid/slider" {
  import type { Component, JSX } from "solid-js";

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
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderValueTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderControlProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderTrackProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderRangeProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderThumbProps {
    index: number;
    name?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderMarkerGroupProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderMarkerProps {
    value: number;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderDraggingIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SliderHiddenInputProps {
    asChild?: boolean;
  }

  export const Slider: {
    Root: Component<SliderRootProps>;
    Label: Component<SliderLabelProps>;
    ValueText: Component<SliderValueTextProps>;
    Control: Component<SliderControlProps>;
    Track: Component<SliderTrackProps>;
    Range: Component<SliderRangeProps>;
    Thumb: Component<SliderThumbProps>;
    MarkerGroup: Component<SliderMarkerGroupProps>;
    Marker: Component<SliderMarkerProps>;
    DraggingIndicator: Component<SliderDraggingIndicatorProps>;
    HiddenInput: Component<SliderHiddenInputProps>;
  };
}
