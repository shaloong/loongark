<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverCloseTriggerProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverCloseTriggerProps["asChild"] = undefined;
  export let id: PopoverCloseTriggerProps["id"] = undefined;
</script>

<Popover.CloseTrigger {...{ asChild, id }} data-scope="popover" data-part="close-trigger">
  <slot />
</Popover.CloseTrigger>
