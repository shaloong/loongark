<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverDescriptionProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverDescriptionProps["asChild"] = undefined;
  export let id: PopoverDescriptionProps["id"] = undefined;
</script>

<Popover.Description {...{ asChild, id }} data-scope="popover" data-part="description">
  <slot />
</Popover.Description>
