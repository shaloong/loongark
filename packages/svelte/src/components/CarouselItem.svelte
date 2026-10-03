<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselItemProps } from "@ark-ui/svelte/carousel";
  export let index: CarouselItemProps["index"];
</script>

<Carousel.Item {index} data-scope="carousel" data-part="item" {...$$restProps}>
  <slot />
</Carousel.Item>
