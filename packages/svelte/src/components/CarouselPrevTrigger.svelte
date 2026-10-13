<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@loongark/primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselPrevTriggerProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.PrevTrigger
  data-scope="carousel"
  data-part="prev-trigger"
  {...$$restProps}
>
  <slot />
</Carousel.PrevTrigger>
