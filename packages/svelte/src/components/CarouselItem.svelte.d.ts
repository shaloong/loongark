import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselItemProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselItem extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.Item>, "children" | "index"> & {
    index: CarouselItemProps["index"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
