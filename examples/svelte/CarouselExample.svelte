<script lang="ts">
  import {
    LoongArkCarouselRoot,
    LoongArkCarouselItemGroup,
    LoongArkCarouselItem,
    LoongArkCarouselControl,
    LoongArkCarouselPrevTrigger,
    LoongArkCarouselNextTrigger,
    LoongArkCarouselIndicatorGroup,
    LoongArkCarouselIndicator,
  } from "@loongark/svelte";
  import type { CarouselSize } from "@loongark/primitives";

  export let size: CarouselSize = "md";

  const slides = [
    { title: "Aurora", description: "Soft gradients in motion." },
    { title: "Nebula", description: "Deep space color fields." },
    { title: "Orbit", description: "Precision alignment for teams." },
  ];
</script>

<LoongArkCarouselRoot {size} style="max-width: 420px;">
  <LoongArkCarouselItemGroup>
    {#each slides as slide, index (slide.title)}
      <LoongArkCarouselItem {index}>
        <div style="display: grid; gap: 4px;">
          <strong>{slide.title}</strong>
          <span style="opacity: 0.7;">{slide.description}</span>
        </div>
      </LoongArkCarouselItem>
    {/each}
  </LoongArkCarouselItemGroup>
  <LoongArkCarouselControl>
    <LoongArkCarouselPrevTrigger>Prev</LoongArkCarouselPrevTrigger>
    <LoongArkCarouselIndicatorGroup>
      {#each slides as _, index}
        <LoongArkCarouselIndicator {index} />
      {/each}
    </LoongArkCarouselIndicatorGroup>
    <LoongArkCarouselNextTrigger>Next</LoongArkCarouselNextTrigger>
  </LoongArkCarouselControl>
</LoongArkCarouselRoot>
