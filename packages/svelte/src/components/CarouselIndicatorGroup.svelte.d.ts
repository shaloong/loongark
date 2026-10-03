import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselIndicatorGroupProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselIndicatorGroup extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.IndicatorGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
