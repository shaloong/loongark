<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselIndicatorGroupProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.IndicatorGroup
  data-scope="carousel"
  data-part="indicator-group"
  {...$$restProps}
>
  <slot />
</Carousel.IndicatorGroup>
