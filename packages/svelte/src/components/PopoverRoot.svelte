<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticPopoverStyles } from "@shaloong/loongark-primitives/automatic-styles/popover";
  registerAutomaticStyles(lkAutomaticPopoverStyles);

  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverRootProps } from "@ark-ui/svelte/popover";
  export let id: PopoverRootProps["id"] = undefined;
  export let positioning: PopoverRootProps["positioning"] = undefined;
  export let defaultOpen: PopoverRootProps["defaultOpen"] = undefined;
  export let open: PopoverRootProps["open"] = undefined;
  export let onOpenChange: PopoverRootProps["onOpenChange"] = undefined;
</script>

<Popover.Root
  {...{ id, positioning, defaultOpen, open, onOpenChange }}
  {...$$restProps}
>
  <slot />
</Popover.Root>
