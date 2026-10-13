<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@loongark/primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselIndicatorProps } from "@ark-ui/svelte/carousel";
  export let index: CarouselIndicatorProps["index"];
</script>

<Carousel.Indicator
  {index}
  data-scope="carousel"
  data-part="indicator"
  {...$$restProps}
>
  <slot />
</Carousel.Indicator>
