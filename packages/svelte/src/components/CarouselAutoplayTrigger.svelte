<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@shaloong/loongark-primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselAutoplayTriggerProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.AutoplayTrigger
  data-scope="carousel"
  data-part="autoplay-trigger"
  {...$$restProps}
>
  <slot />
</Carousel.AutoplayTrigger>
