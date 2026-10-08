<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselIndicatorProps } from "@ark-ui/svelte/carousel";
  export let index: CarouselIndicatorProps["index"];
</script>

<Carousel.Indicator
  {index}
  data-scope="carousel"
  data-part="indicator"
  {...$$restProps}
>
  <slot />
</Carousel.Indicator>
