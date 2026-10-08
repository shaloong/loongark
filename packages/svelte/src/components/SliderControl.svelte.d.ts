import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";

export default class LoongArkSliderControl extends SvelteComponent<
  Omit<ComponentProps<typeof Slider.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
