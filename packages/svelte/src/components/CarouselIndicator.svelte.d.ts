import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselIndicatorProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.Indicator>, "children" | "index"> & {
    index: CarouselIndicatorProps["index"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
