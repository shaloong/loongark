<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTooltipStyles } from "@shaloong/loongark-primitives/automatic-styles/tooltip";
  registerAutomaticStyles(lkAutomaticTooltipStyles);

  import { Tooltip } from "@ark-ui/svelte/tooltip";
</script>

<Tooltip.Trigger data-scope="tooltip" data-part="trigger" {...$$restProps}>
  <slot />
</Tooltip.Trigger>
