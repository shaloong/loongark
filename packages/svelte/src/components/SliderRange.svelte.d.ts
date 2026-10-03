import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";

export default class LoongArkSliderRange extends SvelteComponent<
  Omit<ComponentProps<typeof Slider.Range>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
