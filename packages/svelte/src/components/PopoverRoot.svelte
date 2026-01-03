<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverRootProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverRootProps["asChild"] = undefined;
  export let id: PopoverRootProps["id"] = undefined;
  export let positioning: PopoverRootProps["positioning"] = undefined;
  export let defaultOpen: PopoverRootProps["defaultOpen"] = undefined;
  export let open: PopoverRootProps["open"] = undefined;
  export let onOpenChange: PopoverRootProps["onOpenChange"] = undefined;
</script>

<Popover.Root
  {...{ asChild, id, positioning, defaultOpen, open, onOpenChange }}
  data-scope="popover"
  data-part="root"
>
  <slot />
</Popover.Root>
