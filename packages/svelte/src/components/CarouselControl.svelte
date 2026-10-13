<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@loongark/primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselControlProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.Control
  data-scope="carousel"
  data-part="control"
  {...$$restProps}
>
  <slot />
</Carousel.Control>
