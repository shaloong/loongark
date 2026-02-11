<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselAutoplayTriggerProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.AutoplayTrigger
  data-scope="carousel"
  data-part="autoplay-trigger"
  {...$$restProps}
>
  <slot />
</Carousel.AutoplayTrigger>
