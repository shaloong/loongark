<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@shaloong/loongark-primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

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
