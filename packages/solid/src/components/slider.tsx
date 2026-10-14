
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticSliderStyles } from "@shaloong/loongark-primitives/automatic-styles/slider";
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
import type { SliderOrientation, SliderSize } from "@shaloong/loongark-primitives";

export interface LoongArkSliderRootProps extends Omit<
  ArkSliderRootProps,
  "asChild"
> {
  size?: SliderSize;
  orientation?: SliderOrientation;
  children?: JSX.Element;
}

export const LoongArkSliderRoot: Component<LoongArkSliderRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as SliderSize,
      orientation: "horizontal" as SliderOrientation,
    },
    props,
  );

  return (
    <ArkSlider.Root
      {...props}
      orientation={merged.orientation}
      data-scope="slider"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkSlider.Root>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderLabel: Component<
  ArkSliderLabelProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.Label {...props} data-scope="slider" data-part="label">
      {props.children}
    </ArkSlider.Label>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderValueText: Component<
  ArkSliderValueTextProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.ValueText {...props} data-scope="slider" data-part="value-text">
      {props.children}
    </ArkSlider.ValueText>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderControl: Component<
  ArkSliderControlProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.Control {...props} data-scope="slider" data-part="control">
      {props.children}
    </ArkSlider.Control>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderTrack: Component<
  ArkSliderTrackProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.Track {...props} data-scope="slider" data-part="track">
      {props.children}
    </ArkSlider.Track>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderRange: Component<
  ArkSliderRangeProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.Range {...props} data-scope="slider" data-part="range">
      {props.children}
    </ArkSlider.Range>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderThumb: Component<
  ArkSliderThumbProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.Thumb {...props} data-scope="slider" data-part="thumb">
      {props.children}
    </ArkSlider.Thumb>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderMarkerGroup: Component<
  ArkSliderMarkerGroupProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.MarkerGroup
      {...props}
      data-scope="slider"
      data-part="marker-group"
    >
      {props.children}
    </ArkSlider.MarkerGroup>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderMarker: Component<
  ArkSliderMarkerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.Marker {...props} data-scope="slider" data-part="marker">
      {props.children}
    </ArkSlider.Marker>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderDraggingIndicator: Component<
  ArkSliderDraggingIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSlider.DraggingIndicator
      {...props}
      data-scope="slider"
      data-part="dragging-indicator"
    >
      {props.children}
    </ArkSlider.DraggingIndicator>
  );
}, lkAutomaticSliderStyles);

export const LoongArkSliderHiddenInput: Component<ArkSliderHiddenInputProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  return (
    <ArkSlider.HiddenInput
      {...props}
      data-scope="slider"
      data-part="hidden-input"
    />
  );
}, lkAutomaticSliderStyles);
