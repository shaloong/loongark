<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTooltipStyles } from "@loongark/primitives/automatic-styles/tooltip";
  registerAutomaticStyles(lkAutomaticTooltipStyles);

  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipPositionerProps } from "@ark-ui/svelte/tooltip";
  const props: Partial<TooltipPositionerProps> = {};
</script>

<Tooltip.Positioner
  {...props}
  data-scope="tooltip"
  data-part="positioner"
  {...$$restProps}
>
  <slot />
</Tooltip.Positioner>
