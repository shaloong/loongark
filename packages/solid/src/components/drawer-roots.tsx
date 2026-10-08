import {
  Drawer,
  type DrawerRootProps,
  type DrawerRootProviderProps,
} from "@ark-ui/solid/drawer";
export const DrawerRoot = (props: DrawerRootProps) => (
  <Drawer.Root lazyMount unmountOnExit {...props} />
);
export const DrawerRootProvider = (props: DrawerRootProviderProps) => (
  <Drawer.RootProvider lazyMount unmountOnExit {...props} />
);
