<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@shaloong/loongark-primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselNextTriggerProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.NextTrigger
  data-scope="carousel"
  data-part="next-trigger"
  {...$$restProps}
>
  <slot />
</Carousel.NextTrigger>
