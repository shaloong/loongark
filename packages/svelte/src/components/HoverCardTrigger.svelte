<script lang="ts">
  import { HoverCard } from "@ark-ui/svelte/hover-card";
  import type { HoverCardTriggerProps } from "@ark-ui/svelte/hover-card";
</script>

<HoverCard.Trigger
  data-scope="hover-card"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</HoverCard.Trigger>
