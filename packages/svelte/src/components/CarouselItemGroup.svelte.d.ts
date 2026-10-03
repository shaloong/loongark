import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselItemGroupProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselItemGroup extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.ItemGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
