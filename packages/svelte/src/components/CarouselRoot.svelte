<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselRootProps } from "@ark-ui/svelte/carousel";
  import type { CarouselSize } from "@loongark/primitives";

  export let size: CarouselSize = "md";
  export let slideCount: CarouselRootProps["slideCount"];
</script>

<Carousel.Root
  {slideCount}
  data-scope="carousel"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Carousel.Root>
