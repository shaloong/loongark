<script lang="ts">
  import { Tooltip } from "@ark-ui/svelte/tooltip";
  import type { TooltipRootProps } from "@ark-ui/svelte/tooltip";
  const props: Partial<TooltipRootProps> = {};
</script>

<Tooltip.Root {...props} data-scope="tooltip" data-part="root">
  <slot />
</Tooltip.Root>
