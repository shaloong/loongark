<script lang="ts">
  import { Tooltip } from "@ark-ui/svelte/tooltip";
</script>

<Tooltip.Trigger data-scope="tooltip" data-part="trigger" {...$$restProps}>
  <slot />
</Tooltip.Trigger>
