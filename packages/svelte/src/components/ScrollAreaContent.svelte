<script lang="ts">
  import { ScrollArea } from "@ark-ui/svelte/scroll-area";
  import type { ScrollAreaContentProps } from "@ark-ui/svelte/scroll-area";
</script>

<ScrollArea.Content
  data-scope="scroll-area"
  data-part="content"
  {...$$restProps}
>
  <slot />
</ScrollArea.Content>
