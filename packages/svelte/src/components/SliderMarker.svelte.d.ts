import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";
import type { SliderMarkerProps } from "@ark-ui/svelte/slider";

export default class LoongArkSliderMarker extends SvelteComponent<
  Omit<ComponentProps<typeof Slider.Marker>, "children" | "value"> & {
    value?: SliderMarkerProps["value"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
