<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverContentProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverContentProps["asChild"] = undefined;
  export let trapFocus: PopoverContentProps["trapFocus"] = undefined;
  export let restoreFocus: PopoverContentProps["restoreFocus"] = undefined;
  export let lazyMount: PopoverContentProps["lazyMount"] = undefined;
  export let unmountOnExit: PopoverContentProps["unmountOnExit"] = undefined;
  export let positioning: PopoverContentProps["positioning"] = undefined;
  export let id: PopoverContentProps["id"] = undefined;
</script>

<Popover.Content
  {...{ asChild, trapFocus, restoreFocus, lazyMount, unmountOnExit, positioning, id }}
  data-scope="popover"
  data-part="content"
>
  <slot />
</Popover.Content>
