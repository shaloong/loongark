<script lang="ts">
  import { Collapsible } from "@ark-ui/svelte/collapsible";
  import type { CollapsibleRootProps } from "@ark-ui/svelte/collapsible";
  import type { CollapsibleSize } from "@loongark/primitives";

  export let size: CollapsibleSize = "md";
  export let open: CollapsibleRootProps["open"] = undefined;
  export let defaultOpen: CollapsibleRootProps["defaultOpen"] = undefined;
  export let disabled: CollapsibleRootProps["disabled"] = undefined;
  export let collapsedHeight: CollapsibleRootProps["collapsedHeight"] = undefined;
  export let collapsedWidth: CollapsibleRootProps["collapsedWidth"] = undefined;
  export let id: CollapsibleRootProps["id"] = undefined;
  export let ids: CollapsibleRootProps["ids"] = undefined;
  export let lazyMount: CollapsibleRootProps["lazyMount"] = undefined;
  export let unmountOnExit: CollapsibleRootProps["unmountOnExit"] = undefined;
  export let onOpenChange: CollapsibleRootProps["onOpenChange"] = undefined;
  export let onExitComplete: CollapsibleRootProps["onExitComplete"] = undefined;
</script>

<Collapsible.Root
  {open}
  {defaultOpen}
  {disabled}
  {collapsedHeight}
  {collapsedWidth}
  {id}
  {ids}
  {lazyMount}
  {unmountOnExit}
  {onOpenChange}
  {onExitComplete}
  data-scope="collapsible"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Collapsible.Root>
