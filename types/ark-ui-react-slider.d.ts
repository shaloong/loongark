declare module "@ark-ui/react/slider" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
  } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderLabelProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderValueTextProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderControlProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderTrackProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderRangeProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderThumbProps {
    index: number;
    name?: string;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderMarkerGroupProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderMarkerProps {
    value: number;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderDraggingIndicatorProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SliderHiddenInputProps {
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    SliderRootProps & RefAttributes<HTMLDivElement>
  >;
  export const Label: ForwardRefExoticComponent<
    SliderLabelProps & RefAttributes<HTMLLabelElement>
  >;
  export const ValueText: ForwardRefExoticComponent<
    SliderValueTextProps & RefAttributes<HTMLSpanElement>
  >;
  export const Control: ForwardRefExoticComponent<
    SliderControlProps & RefAttributes<HTMLDivElement>
  >;
  export const Track: ForwardRefExoticComponent<
    SliderTrackProps & RefAttributes<HTMLDivElement>
  >;
  export const Range: ForwardRefExoticComponent<
    SliderRangeProps & RefAttributes<HTMLDivElement>
  >;
  export const Thumb: ForwardRefExoticComponent<
    SliderThumbProps & RefAttributes<HTMLDivElement>
  >;
  export const MarkerGroup: ForwardRefExoticComponent<
    SliderMarkerGroupProps & RefAttributes<HTMLDivElement>
  >;
  export const Marker: ForwardRefExoticComponent<
    SliderMarkerProps & RefAttributes<HTMLSpanElement>
  >;
  export const DraggingIndicator: ForwardRefExoticComponent<
    SliderDraggingIndicatorProps & RefAttributes<HTMLSpanElement>
  >;
  export const HiddenInput: ForwardRefExoticComponent<
    SliderHiddenInputProps & RefAttributes<HTMLInputElement>
  >;

  export const Slider: {
    Root: typeof Root;
    Label: typeof Label;
    ValueText: typeof ValueText;
    Control: typeof Control;
    Track: typeof Track;
    Range: typeof Range;
    Thumb: typeof Thumb;
    MarkerGroup: typeof MarkerGroup;
    Marker: typeof Marker;
    DraggingIndicator: typeof DraggingIndicator;
    HiddenInput: typeof HiddenInput;
  };
}
