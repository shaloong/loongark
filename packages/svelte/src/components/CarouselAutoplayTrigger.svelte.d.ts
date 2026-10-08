import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselAutoplayTriggerProps } from "@ark-ui/svelte/carousel";

export default class LoongArkCarouselAutoplayTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Carousel.AutoplayTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
