<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselItemGroupProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.ItemGroup
  data-scope="carousel"
  data-part="item-group"
  {...$$restProps}
>
  <slot />
</Carousel.ItemGroup>
