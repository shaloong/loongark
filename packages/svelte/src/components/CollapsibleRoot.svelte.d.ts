import { SvelteComponent, type ComponentProps } from "svelte";
import { Collapsible } from "@ark-ui/svelte/collapsible";
import type { CollapsibleRootProps } from "@ark-ui/svelte/collapsible";
import type { CollapsibleSize } from "@loongark/primitives";

export default class LoongArkCollapsibleRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Collapsible.Root>,
    | "children"
    | "size"
    | "open"
    | "defaultOpen"
    | "disabled"
    | "collapsedHeight"
    | "collapsedWidth"
    | "id"
    | "ids"
    | "lazyMount"
    | "unmountOnExit"
    | "onOpenChange"
    | "onExitComplete"
  > & {
    size?: CollapsibleSize;
    open?: CollapsibleRootProps["open"];
    defaultOpen?: CollapsibleRootProps["defaultOpen"];
    disabled?: CollapsibleRootProps["disabled"];
    collapsedHeight?: CollapsibleRootProps["collapsedHeight"];
    collapsedWidth?: CollapsibleRootProps["collapsedWidth"];
    id?: CollapsibleRootProps["id"];
    ids?: CollapsibleRootProps["ids"];
    lazyMount?: CollapsibleRootProps["lazyMount"];
    unmountOnExit?: CollapsibleRootProps["unmountOnExit"];
    onOpenChange?: CollapsibleRootProps["onOpenChange"];
    onExitComplete?: CollapsibleRootProps["onExitComplete"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
