<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselControlProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.Control
  data-scope="carousel"
  data-part="control"
  {...$$restProps}
>
  <slot />
</Carousel.Control>
