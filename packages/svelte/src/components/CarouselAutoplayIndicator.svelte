<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@loongark/primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

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
