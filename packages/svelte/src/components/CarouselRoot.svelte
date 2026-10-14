<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCarouselStyles } from "@shaloong/loongark-primitives/automatic-styles/carousel";
  registerAutomaticStyles(lkAutomaticCarouselStyles);

  import { Carousel } from "@ark-ui/svelte/carousel";
  import type { CarouselRootProps } from "@ark-ui/svelte/carousel";
  import type { CarouselSize } from "@shaloong/loongark-primitives";

  export let size: CarouselSize = "md";
  export let slideCount: CarouselRootProps["slideCount"];
</script>

<Carousel.Root
  {slideCount}
  data-scope="carousel"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Carousel.Root>
