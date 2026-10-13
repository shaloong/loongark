<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticHoverCardStyles } from "@loongark/primitives/automatic-styles/hover-card";
  registerAutomaticStyles(lkAutomaticHoverCardStyles);

  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import type { HoverCardRootProps } from "@ark-ui/svelte/hover-card";
  import type { HoverCardSize } from "@loongark/primitives";

  export let size: HoverCardSize = "md";
</script>

<HoverCard.Root {...$$restProps}>
  <div data-scope="hover-card" data-part="root" data-size={size}><slot /></div>
</HoverCard.Root>
