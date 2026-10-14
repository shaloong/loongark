<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTooltipStyles } from "@shaloong/loongark-primitives/automatic-styles/tooltip";
  registerAutomaticStyles(lkAutomaticTooltipStyles);

  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipContentProps } from "@ark-ui/svelte/tooltip";
  const props: Partial<TooltipContentProps> = {};
</script>

<Tooltip.Content
  {...props}
  data-scope="tooltip"
  data-part="content"
  {...$$restProps}
>
  <slot />
</Tooltip.Content>
