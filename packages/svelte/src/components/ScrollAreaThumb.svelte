<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticScrollAreaStyles } from "@loongark/primitives/automatic-styles/scroll-area";
  registerAutomaticStyles(lkAutomaticScrollAreaStyles);

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
