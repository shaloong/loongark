import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";
import type { SliderRootProps } from "@ark-ui/svelte/slider";
import type { SliderOrientation, SliderSize } from "@loongark/primitives";

export default class LoongArkSliderRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Slider.Root>,
    | "children"
    | "size"
    | "orientation"
    | "value"
    | "defaultValue"
    | "min"
    | "max"
    | "step"
    | "minStepsBetweenThumbs"
    | "disabled"
    | "readOnly"
    | "invalid"
    | "name"
    | "form"
    | "id"
    | "ids"
    | "origin"
    | "thumbAlignment"
    | "thumbSize"
    | "onValueChange"
    | "onValueChangeEnd"
    | "onFocusChange"
    | "getAriaValueText"
  > & {
    size?: SliderSize;
    orientation?: SliderOrientation;
    value?: SliderRootProps["value"];
    defaultValue?: SliderRootProps["defaultValue"];
    min?: SliderRootProps["min"];
    max?: SliderRootProps["max"];
    step?: SliderRootProps["step"];
    minStepsBetweenThumbs?: SliderRootProps["minStepsBetweenThumbs"];
    disabled?: SliderRootProps["disabled"];
    readOnly?: SliderRootProps["readOnly"];
    invalid?: SliderRootProps["invalid"];
    name?: SliderRootProps["name"];
    form?: SliderRootProps["form"];
    id?: SliderRootProps["id"];
    ids?: SliderRootProps["ids"];
    origin?: SliderRootProps["origin"];
    thumbAlignment?: SliderRootProps["thumbAlignment"];
    thumbSize?: SliderRootProps["thumbSize"];
    onValueChange?: SliderRootProps["onValueChange"];
    onValueChangeEnd?: SliderRootProps["onValueChangeEnd"];
    onFocusChange?: SliderRootProps["onFocusChange"];
    getAriaValueText?: SliderRootProps["getAriaValueText"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
