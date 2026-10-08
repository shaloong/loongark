import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselPrevTriggerProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselPrevTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.PrevTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
