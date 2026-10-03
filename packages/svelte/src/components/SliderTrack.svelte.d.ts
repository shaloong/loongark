import { SvelteComponent, type ComponentProps } from "svelte";
import { Slider } from "@ark-ui/svelte/slider";

export default class LoongArkSliderTrack extends SvelteComponent<
  Omit<ComponentProps<typeof Slider.Track>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
