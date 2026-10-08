<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverTriggerProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverTriggerProps["asChild"] | undefined = undefined;
  export let id: PopoverTriggerProps["id"] = undefined;
  export let disabled: PopoverTriggerProps["disabled"] = undefined;
</script>

<Popover.Trigger
  {...{ asChild, id, disabled }}
  data-scope="popover"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</Popover.Trigger>
