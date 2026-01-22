/**
 * Slider component - Solid wrapper
 * Based on Ark UI Slider
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  Slider as ArkSlider,
  type SliderRootProps as ArkSliderRootProps,
  type SliderLabelProps as ArkSliderLabelProps,
  type SliderValueTextProps as ArkSliderValueTextProps,
  type SliderControlProps as ArkSliderControlProps,
  type SliderTrackProps as ArkSliderTrackProps,
  type SliderRangeProps as ArkSliderRangeProps,
  type SliderThumbProps as ArkSliderThumbProps,
  type SliderMarkerGroupProps as ArkSliderMarkerGroupProps,
  type SliderMarkerProps as ArkSliderMarkerProps,
  type SliderDraggingIndicatorProps as ArkSliderDraggingIndicatorProps,
  type SliderHiddenInputProps as ArkSliderHiddenInputProps,
} from "@ark-ui/solid/slider";
import type { SliderOrientation, SliderSize } from "@loongark/primitives";

export interface LoongArkSliderRootProps
  extends Omit<ArkSliderRootProps, "asChild"> {
  size?: SliderSize;
  orientation?: SliderOrientation;
  children?: JSX.Element;
}

export const LoongArkSliderRoot: Component<LoongArkSliderRootProps> = (props) => {
  const merged = mergeProps(
    { size: "md" as SliderSize, orientation: "horizontal" as SliderOrientation },
    props
  );

  return (
    <ArkSlider.Root
      {...(props as any)}
      orientation={merged.orientation}
      data-scope="slider"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkSlider.Root>
  );
};

export const LoongArkSliderLabel: Component<
  ArkSliderLabelProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.Label {...props} data-scope="slider" data-part="label">
      {props.children}
    </ArkSlider.Label>
  );
};

export const LoongArkSliderValueText: Component<
  ArkSliderValueTextProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.ValueText {...props} data-scope="slider" data-part="value-text">
      {props.children}
    </ArkSlider.ValueText>
  );
};

export const LoongArkSliderControl: Component<
  ArkSliderControlProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.Control {...props} data-scope="slider" data-part="control">
      {props.children}
    </ArkSlider.Control>
  );
};

export const LoongArkSliderTrack: Component<
  ArkSliderTrackProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.Track {...props} data-scope="slider" data-part="track">
      {props.children}
    </ArkSlider.Track>
  );
};

export const LoongArkSliderRange: Component<
  ArkSliderRangeProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.Range {...props} data-scope="slider" data-part="range">
      {props.children}
    </ArkSlider.Range>
  );
};

export const LoongArkSliderThumb: Component<
  ArkSliderThumbProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.Thumb {...props} data-scope="slider" data-part="thumb">
      {props.children}
    </ArkSlider.Thumb>
  );
};

export const LoongArkSliderMarkerGroup: Component<
  ArkSliderMarkerGroupProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.MarkerGroup
      {...props}
      data-scope="slider"
      data-part="marker-group"
    >
      {props.children}
    </ArkSlider.MarkerGroup>
  );
};

export const LoongArkSliderMarker: Component<
  ArkSliderMarkerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.Marker {...props} data-scope="slider" data-part="marker">
      {props.children}
    </ArkSlider.Marker>
  );
};

export const LoongArkSliderDraggingIndicator: Component<
  ArkSliderDraggingIndicatorProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkSlider.DraggingIndicator
      {...props}
      data-scope="slider"
      data-part="dragging-indicator"
    >
      {props.children}
    </ArkSlider.DraggingIndicator>
  );
};

export const LoongArkSliderHiddenInput: Component<ArkSliderHiddenInputProps> = (
  props
) => {
  return (
    <ArkSlider.HiddenInput
      {...props}
      data-scope="slider"
      data-part="hidden-input"
    />
  );
};
