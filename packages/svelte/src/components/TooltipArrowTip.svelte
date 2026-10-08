<script lang="ts">
  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipArrowTipProps } from "@ark-ui/svelte/tooltip";
  const props: Partial<TooltipArrowTipProps> = {};
</script>

<Tooltip.ArrowTip
  {...props}
  data-scope="tooltip"
  data-part="arrow-tip"
  {...$$restProps}
>
  <slot />
</Tooltip.ArrowTip>
