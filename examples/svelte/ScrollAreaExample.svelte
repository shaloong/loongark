<script lang="ts">
  import {
    LoongArkScrollAreaRoot,
    LoongArkScrollAreaViewport,
    LoongArkScrollAreaContent,
    LoongArkScrollAreaScrollbar,
    LoongArkScrollAreaThumb,
    LoongArkScrollAreaCorner,
  } from "@shaloong/loongark-svelte";
  import type { ScrollAreaSize } from "@shaloong/loongark-primitives";

  export let size: ScrollAreaSize = "md";

  const items = Array.from(
    { length: 12 },
    (_, index) => `Release note ${index + 1}`,
  );
</script>

<LoongArkScrollAreaRoot {size} style="width: 320px; height: 200px;">
  <LoongArkScrollAreaViewport>
    <LoongArkScrollAreaContent>
      <div style="display: grid; gap: 8px; padding: 12px;">
        {#each items as item}
          <div>{item}</div>
        {/each}
      </div>
    </LoongArkScrollAreaContent>
  </LoongArkScrollAreaViewport>
  <LoongArkScrollAreaScrollbar orientation="vertical">
    <LoongArkScrollAreaThumb />
  </LoongArkScrollAreaScrollbar>
  <LoongArkScrollAreaScrollbar orientation="horizontal">
    <LoongArkScrollAreaThumb />
  </LoongArkScrollAreaScrollbar>
  <LoongArkScrollAreaCorner />
</LoongArkScrollAreaRoot>
