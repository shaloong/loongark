<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticScrollAreaStyles } from "@shaloong/loongark-primitives/automatic-styles/scroll-area";
  registerAutomaticStyles(lkAutomaticScrollAreaStyles);

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
