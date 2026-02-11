<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselAutoplayIndicatorProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.AutoplayIndicator
  data-scope="carousel"
  data-part="autoplay-indicator"
  {...$$restProps}
>
  <slot />
</Carousel.AutoplayIndicator>
