import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselNextTriggerProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselNextTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.NextTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
