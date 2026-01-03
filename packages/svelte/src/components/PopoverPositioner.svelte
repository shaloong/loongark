<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverPositionerProps } from "@ark-ui/svelte/popover";
  export let id: PopoverPositionerProps["id"] = undefined;
</script>

<Popover.Positioner {...{ id }} data-scope="popover" data-part="positioner">
  <slot />
</Popover.Positioner>
