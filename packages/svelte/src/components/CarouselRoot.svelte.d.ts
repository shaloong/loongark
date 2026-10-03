import { SvelteComponent, type ComponentProps } from "svelte";
import { Carousel } from "@ark-ui/svelte/carousel";
import type { CarouselRootProps } from "@ark-ui/svelte/carousel";
import type { CarouselSize } from "@loongark/primitives";

export default class LoongArkCarouselRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Carousel.Root>,
    "children" | "size" | "slideCount"
  > & { size?: CarouselSize; slideCount: CarouselRootProps["slideCount"] },
  Record<string, never>,
  { default: Record<string, never> }
> {}
