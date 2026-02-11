<script lang="ts">
  import { ScrollArea } from "@ark-ui/svelte/scroll-area";
  import type { ScrollAreaCornerProps } from "@ark-ui/svelte/scroll-area";
</script>

<ScrollArea.Corner
  data-scope="scroll-area"
  data-part="corner"
  {...$$restProps}
>
  <slot />
</ScrollArea.Corner>
