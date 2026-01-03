<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverTitleProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverTitleProps["asChild"] = undefined;
  export let id: PopoverTitleProps["id"] = undefined;
</script>

<Popover.Title {...{ asChild, id }} data-scope="popover" data-part="title">
  <slot />
</Popover.Title>
