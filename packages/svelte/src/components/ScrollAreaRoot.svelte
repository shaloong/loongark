<script lang="ts">
  import { ScrollArea } from "@ark-ui/svelte/scroll-area";
  import type { ScrollAreaRootProps } from "@ark-ui/svelte/scroll-area";
  import type { ScrollAreaSize } from "@loongark/primitives";

  export let size: ScrollAreaSize = "md";
</script>

<ScrollArea.Root
  data-scope="scroll-area"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</ScrollArea.Root>
