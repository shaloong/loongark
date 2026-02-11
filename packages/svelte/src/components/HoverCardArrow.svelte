<script lang="ts">
  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import type { HoverCardArrowProps } from "@ark-ui/svelte/hover-card";
</script>

<HoverCard.Arrow
  data-scope="hover-card"
  data-part="arrow"
  {...$$restProps}
>
  <slot />
</HoverCard.Arrow>
