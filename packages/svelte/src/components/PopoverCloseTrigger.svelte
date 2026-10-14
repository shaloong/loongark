<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticPopoverStyles } from "@shaloong/loongark-primitives/automatic-styles/popover";
  registerAutomaticStyles(lkAutomaticPopoverStyles);

  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverCloseTriggerProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverCloseTriggerProps["asChild"] = undefined;
  export let id: PopoverCloseTriggerProps["id"] = undefined;
</script>

<Popover.CloseTrigger
  {...{ asChild, id }}
  data-scope="popover"
  data-part="close-trigger"
  {...$$restProps}
>
  <slot />
</Popover.CloseTrigger>
