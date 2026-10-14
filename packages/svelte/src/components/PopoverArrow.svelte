<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticPopoverStyles } from "@shaloong/loongark-primitives/automatic-styles/popover";
  registerAutomaticStyles(lkAutomaticPopoverStyles);

  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverArrowProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverArrowProps["asChild"] = undefined;
  export let id: PopoverArrowProps["id"] = undefined;
</script>

<Popover.Arrow
  {...{ asChild, id }}
  data-scope="popover"
  data-part="arrow"
  {...$$restProps}
>
  <slot />
</Popover.Arrow>
