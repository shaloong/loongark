<script lang="ts">
  import { Popover } from "@ark-ui/svelte/popover";
  import type { PopoverContentProps } from "@ark-ui/svelte/popover";
  export let asChild: PopoverContentProps["asChild"] = undefined;
  export let id: PopoverContentProps["id"] = undefined;
  export let showArrow: boolean = false;
</script>

<Popover.Content
  {asChild}
  {id}
  data-scope="popover"
  data-part="content"
  data-arrow={showArrow ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</Popover.Content>
