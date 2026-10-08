<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
  import type { MenuRootProps } from "@ark-ui/svelte/menu";
  import type { MenuSize } from "@loongark/primitives";
  import { createMenuSizeContext } from "./menuContext";

  export let size: MenuSize = "md";
  export let open: MenuRootProps["open"] = undefined;
  export let defaultOpen: MenuRootProps["defaultOpen"] = undefined;
  export let onOpenChange: MenuRootProps["onOpenChange"] = undefined;
  export let onSelect: MenuRootProps["onSelect"] = undefined;
  export let id: MenuRootProps["id"] = undefined;
  export let ids: MenuRootProps["ids"] = undefined;
  export let highlightedValue: MenuRootProps["highlightedValue"] = undefined;
  export let defaultHighlightedValue: MenuRootProps["defaultHighlightedValue"] =
    undefined;
  export let onHighlightChange: MenuRootProps["onHighlightChange"] = undefined;
  export let positioning: MenuRootProps["positioning"] = undefined;
  export let anchorPoint: MenuRootProps["anchorPoint"] = undefined;
  export let closeOnSelect: MenuRootProps["closeOnSelect"] = undefined;
  export let loopFocus: MenuRootProps["loopFocus"] = undefined;
  export let typeahead: MenuRootProps["typeahead"] = undefined;
  export let composite: MenuRootProps["composite"] = undefined;
  export let navigate: MenuRootProps["navigate"] = undefined;
  export let lazyMount: MenuRootProps["lazyMount"] = undefined;
  export let unmountOnExit: MenuRootProps["unmountOnExit"] = undefined;
  export let present: MenuRootProps["present"] = undefined;
  export let skipAnimationOnMount: MenuRootProps["skipAnimationOnMount"] =
    undefined;

  const sizeStore = createMenuSizeContext(size);

  $: sizeStore.set(size);
</script>

<Menu.Root
  {...{
    open,
    defaultOpen,
    onOpenChange,
    onSelect,
    id,
    ids,
    highlightedValue,
    defaultHighlightedValue,
    onHighlightChange,
    positioning,
    anchorPoint,
    closeOnSelect,
    loopFocus,
    typeahead,
    composite,
    navigate,
    lazyMount,
    unmountOnExit,
    present,
    skipAnimationOnMount,
  }}
  {...$$restProps}
>
  <slot />
</Menu.Root>
