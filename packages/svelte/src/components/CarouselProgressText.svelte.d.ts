import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselProgressTextProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselProgressText extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.ProgressText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
