<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticHoverCardStyles } from "@shaloong/loongark-primitives/automatic-styles/hover-card";
  registerAutomaticStyles(lkAutomaticHoverCardStyles);

  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import type { HoverCardPositionerProps } from "@ark-ui/svelte/hover-card";
</script>

<HoverCard.Positioner
  data-scope="hover-card"
  data-part="positioner"
  {...$$restProps}
>
  <slot />
</HoverCard.Positioner>
