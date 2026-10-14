<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTooltipStyles } from "@shaloong/loongark-primitives/automatic-styles/tooltip";
  registerAutomaticStyles(lkAutomaticTooltipStyles);

  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipArrowProps } from "@ark-ui/svelte/tooltip";
  const props: Partial<TooltipArrowProps> = {};
</script>

<Tooltip.Arrow
  {...props}
  data-scope="tooltip"
  data-part="arrow"
  {...$$restProps}
>
  <slot />
</Tooltip.Arrow>
