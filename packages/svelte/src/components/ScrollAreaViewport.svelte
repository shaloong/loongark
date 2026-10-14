<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticScrollAreaStyles } from "@shaloong/loongark-primitives/automatic-styles/scroll-area";
  registerAutomaticStyles(lkAutomaticScrollAreaStyles);

  import { ScrollArea } from "@ark-ui/svelte/scroll-area";
  import type { ScrollAreaViewportProps } from "@ark-ui/svelte/scroll-area";
</script>

<ScrollArea.Viewport
  tabindex={0}
  data-scope="scroll-area"
  data-part="viewport"
  {...$$restProps}
>
  <slot />
</ScrollArea.Viewport>
