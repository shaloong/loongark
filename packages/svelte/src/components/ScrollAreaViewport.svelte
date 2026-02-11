<script lang="ts">
  import { ScrollArea } from "@ark-ui/svelte/scroll-area";
  import type { ScrollAreaViewportProps } from "@ark-ui/svelte/scroll-area";
</script>

<ScrollArea.Viewport
  data-scope="scroll-area"
  data-part="viewport"
  {...$$restProps}
>
  <slot />
</ScrollArea.Viewport>
