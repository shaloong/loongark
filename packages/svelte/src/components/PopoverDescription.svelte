<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPopoverStyles } from "@loongark/primitives/automatic-styles/popover";
  registerAutomaticStyles(lkAutomaticPopoverStyles);

  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverDescriptionProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverDescriptionProps["asChild"] = undefined;
  export let id: PopoverDescriptionProps["id"] = undefined;
</script>

<Popover.Description
  {...{ asChild, id }}
  data-scope="popover"
  data-part="description"
  {...$$restProps}
>
  <slot />
</Popover.Description>
