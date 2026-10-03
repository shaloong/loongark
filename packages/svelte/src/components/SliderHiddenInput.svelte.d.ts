import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";

export default class LoongArkSliderHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof Slider.HiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
