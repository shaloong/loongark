import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";

export default class LoongArkSliderLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Slider.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
