<script lang="ts">
  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import type { HoverCardArrowTipProps } from "@ark-ui/svelte/hover-card";
</script>

<HoverCard.ArrowTip
  data-scope="hover-card"
  data-part="arrow-tip"
  {...$$restProps}
>
  <slot />
</HoverCard.ArrowTip>
