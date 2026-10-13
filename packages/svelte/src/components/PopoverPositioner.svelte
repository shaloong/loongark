<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPopoverStyles } from "@loongark/primitives/automatic-styles/popover";
  registerAutomaticStyles(lkAutomaticPopoverStyles);

  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverPositionerProps } from "@ark-ui/svelte/popover";
  export let id: PopoverPositionerProps["id"] = undefined;
</script>

<Popover.Positioner
  {...{ id }}
  data-scope="popover"
  data-part="positioner"
  {...$$restProps}
>
  <slot />
</Popover.Positioner>
