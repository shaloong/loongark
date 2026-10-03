import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselAutoplayIndicatorProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselAutoplayIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.AutoplayIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
