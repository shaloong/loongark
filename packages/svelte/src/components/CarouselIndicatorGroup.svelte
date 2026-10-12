<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@loongark/primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

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
