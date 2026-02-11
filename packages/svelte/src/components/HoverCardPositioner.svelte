<script lang="ts">
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
