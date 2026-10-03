import { SvelteComponent, type ComponentProps } from "svelte";
import { Tabs } from "@ark-ui/svelte/tabs";
import type { TabsRootProps } from "@ark-ui/svelte/tabs";
import type { TabsOrientation, TabsSize } from "@loongark/primitives";

export default class LoongArkTabsRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Tabs.Root>,
    | "children"
    | "size"
    | "orientation"
    | "value"
    | "defaultValue"
    | "activationMode"
    | "loopFocus"
    | "composite"
    | "id"
    | "onValueChange"
    | "onFocusChange"
    | "lazyMount"
    | "unmountOnExit"
  > & {
    size?: TabsSize;
    orientation?: TabsOrientation;
    value?: TabsRootProps["value"];
    defaultValue?: TabsRootProps["defaultValue"];
    activationMode?: TabsRootProps["activationMode"];
    loopFocus?: TabsRootProps["loopFocus"];
    composite?: TabsRootProps["composite"];
    id?: TabsRootProps["id"];
    onValueChange?: TabsRootProps["onValueChange"];
    onFocusChange?: TabsRootProps["onFocusChange"];
    lazyMount?: TabsRootProps["lazyMount"];
    unmountOnExit?: TabsRootProps["unmountOnExit"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
