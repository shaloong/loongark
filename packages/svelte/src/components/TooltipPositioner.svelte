<script lang="ts">
  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipPositionerProps } from "@ark-ui/svelte/tooltip";
  const props: Partial<TooltipPositionerProps> = {};
</script>

<Tooltip.Positioner {...props} data-scope="tooltip" data-part="positioner">
  <slot />
</Tooltip.Positioner>
