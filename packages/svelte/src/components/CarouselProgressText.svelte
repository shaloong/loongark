<script lang="ts">
  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselProgressTextProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.ProgressText
  data-scope="carousel"
  data-part="progress-text"
  {...$$restProps}
>
  <slot />
</Carousel.ProgressText>
