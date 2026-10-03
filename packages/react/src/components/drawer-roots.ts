import { createElement } from "react";
import {
  Drawer,
  type DrawerRootProps,
  type DrawerRootProviderProps,
} from "@ark-ui/react/drawer";
// 未显示的嵌套浮层不得被外层模态的 aria-hidden 留在无障碍树之外。
export const DrawerRoot = (props: DrawerRootProps) =>
  createElement(Drawer.Root, {
    lazyMount: true,
    unmountOnExit: true,
    ...props,
  });
export const DrawerRootProvider = (props: DrawerRootProviderProps) =>
  createElement(Drawer.RootProvider, {
    lazyMount: true,
    unmountOnExit: true,
    ...props,
  });
