<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverArrowProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverArrowProps["asChild"] = undefined;
  export let id: PopoverArrowProps["id"] = undefined;
</script>

<Popover.Arrow {...{ asChild, id }} data-scope="popover" data-part="arrow">
  <slot />
</Popover.Arrow>
