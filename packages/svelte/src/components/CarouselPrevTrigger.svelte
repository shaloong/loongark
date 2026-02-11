<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselPrevTriggerProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.PrevTrigger
  data-scope="carousel"
  data-part="prev-trigger"
  {...$$restProps}
>
  <slot />
</Carousel.PrevTrigger>
