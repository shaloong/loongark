<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselNextTriggerProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.NextTrigger
  data-scope="carousel"
  data-part="next-trigger"
  {...$$restProps}
>
  <slot />
</Carousel.NextTrigger>
