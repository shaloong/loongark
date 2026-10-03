import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";

export default class LoongArkSliderDraggingIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Slider.DraggingIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
