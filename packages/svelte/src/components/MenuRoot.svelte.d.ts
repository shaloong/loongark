import { SvelteComponent, type ComponentProps } from "svelte";
import { Menu } from "@ark-ui/svelte/menu";
import type { MenuRootProps } from "@ark-ui/svelte/menu";
import type { MenuSize } from "@loongark/primitives";

export default class LoongArkMenuRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Menu.Root>,
    | "children"
    | "size"
    | "open"
    | "defaultOpen"
    | "onOpenChange"
    | "onSelect"
    | "id"
    | "ids"
    | "highlightedValue"
    | "defaultHighlightedValue"
    | "onHighlightChange"
    | "positioning"
    | "anchorPoint"
    | "closeOnSelect"
    | "loopFocus"
    | "typeahead"
    | "composite"
    | "navigate"
    | "lazyMount"
    | "unmountOnExit"
    | "present"
    | "skipAnimationOnMount"
  > & {
    size?: MenuSize;
    open?: MenuRootProps["open"];
    defaultOpen?: MenuRootProps["defaultOpen"];
    onOpenChange?: MenuRootProps["onOpenChange"];
    onSelect?: MenuRootProps["onSelect"];
    id?: MenuRootProps["id"];
    ids?: MenuRootProps["ids"];
    highlightedValue?: MenuRootProps["highlightedValue"];
    defaultHighlightedValue?: MenuRootProps["defaultHighlightedValue"];
    onHighlightChange?: MenuRootProps["onHighlightChange"];
    positioning?: MenuRootProps["positioning"];
    anchorPoint?: MenuRootProps["anchorPoint"];
    closeOnSelect?: MenuRootProps["closeOnSelect"];
    loopFocus?: MenuRootProps["loopFocus"];
    typeahead?: MenuRootProps["typeahead"];
    composite?: MenuRootProps["composite"];
    navigate?: MenuRootProps["navigate"];
    lazyMount?: MenuRootProps["lazyMount"];
    unmountOnExit?: MenuRootProps["unmountOnExit"];
    present?: MenuRootProps["present"];
    skipAnimationOnMount?: MenuRootProps["skipAnimationOnMount"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
