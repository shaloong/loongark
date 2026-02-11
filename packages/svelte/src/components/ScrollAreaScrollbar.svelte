<script lang="ts">
  import { ScrollArea } from "@ark-ui/svelte/scroll-area";
  import type { ScrollAreaScrollbarProps } from "@ark-ui/svelte/scroll-area";
</script>

<ScrollArea.Scrollbar
  data-scope="scroll-area"
  data-part="scrollbar"
  {...$$restProps}
>
  <slot />
</ScrollArea.Scrollbar>
