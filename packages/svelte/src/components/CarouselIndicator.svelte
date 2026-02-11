<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselIndicatorProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.Indicator
  data-scope="carousel"
  data-part="indicator"
  {...$$restProps}
>
  <slot />
</Carousel.Indicator>
