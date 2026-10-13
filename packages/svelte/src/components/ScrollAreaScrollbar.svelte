<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticScrollAreaStyles } from "@loongark/primitives/automatic-styles/scroll-area";
  registerAutomaticStyles(lkAutomaticScrollAreaStyles);

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
