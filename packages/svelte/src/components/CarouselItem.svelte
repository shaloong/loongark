<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselItemProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.Item
  data-scope="carousel"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Carousel.Item>
