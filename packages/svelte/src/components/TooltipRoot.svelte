<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTooltipStyles } from "@loongark/primitives/automatic-styles/tooltip";
  registerAutomaticStyles(lkAutomaticTooltipStyles);

  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipRootProps } from "@ark-ui/svelte/tooltip";
  const componentId = $props.id();
  let {
    id = componentId,
    children,
    ...props
  }: Omit<TooltipRootProps, "id"> & { id?: string } = $props();
</script>

<Tooltip.Root {id} {...props}>
  {@render children?.()}
</Tooltip.Root>
