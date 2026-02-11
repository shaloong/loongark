<script lang="ts">
  import { ScrollArea } from "@ark-ui/svelte/scroll-area";
  import type { ScrollAreaThumbProps } from "@ark-ui/svelte/scroll-area";
</script>

<ScrollArea.Thumb
  data-scope="scroll-area"
  data-part="thumb"
  {...$$restProps}
>
  <slot />
</ScrollArea.Thumb>
