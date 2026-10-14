<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@shaloong/loongark-primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselItemGroupProps } from "@ark-ui/svelte/carousel";
</script>

<Carousel.ItemGroup
  data-scope="carousel"
  data-part="item-group"
  {...$$restProps}
>
  <slot />
</Carousel.ItemGroup>
