<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@loongark/primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselItemProps } from "@ark-ui/svelte/carousel";
  export let index: CarouselItemProps["index"];
</script>

<Carousel.Item {index} data-scope="carousel" data-part="item" {...$$restProps}>
  <slot />
</Carousel.Item>
