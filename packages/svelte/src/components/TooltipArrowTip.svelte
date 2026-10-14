<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTooltipStyles } from "@shaloong/loongark-primitives/automatic-styles/tooltip";
  registerAutomaticStyles(lkAutomaticTooltipStyles);

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
