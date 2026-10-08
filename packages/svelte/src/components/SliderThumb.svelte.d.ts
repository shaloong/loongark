import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";
import type { SliderThumbProps } from "@ark-ui/svelte/slider";

export default class LoongArkSliderThumb extends SvelteComponent<
  Omit<ComponentProps<typeof Slider.Thumb>, "children" | "index" | "name"> & {
    index?: SliderThumbProps["index"];
    name?: SliderThumbProps["name"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
