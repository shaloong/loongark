<script lang="ts">
  import { Tooltip } from "@ark-ui/svelte/tooltip";
</script>

<Tooltip.Trigger asChild data-scope="tooltip" data-part="trigger">
  <slot />
</Tooltip.Trigger>
