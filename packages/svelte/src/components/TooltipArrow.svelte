<script lang="ts">
  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipArrowProps } from "@ark-ui/svelte/tooltip";
  const props: Partial<TooltipArrowProps> = {};
</script>

<Tooltip.Arrow {...props} data-scope="tooltip" data-part="arrow">
  <slot />
</Tooltip.Arrow>
