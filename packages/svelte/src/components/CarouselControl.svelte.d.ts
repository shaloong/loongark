import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselControlProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselControl extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
