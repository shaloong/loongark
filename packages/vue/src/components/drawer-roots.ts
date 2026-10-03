import { defineComponent } from "vue";
import {
  Drawer,
  type DrawerRootProps,
  type DrawerRootProviderProps,
} from "@ark-ui/vue/drawer";
import { renderPart } from "../render-part";
export const DrawerRoot = defineComponent<DrawerRootProps>({
  inheritAttrs: false,
  setup(_, context) {
    return () =>
      renderPart(
        Drawer.Root,
        { lazyMount: true, unmountOnExit: true, ...context.attrs },
        context.slots,
      );
  },
});
export const DrawerRootProvider = defineComponent<DrawerRootProviderProps>({
  inheritAttrs: false,
  setup(_, context) {
    return () =>
      renderPart(
        Drawer.RootProvider,
        { lazyMount: true, unmountOnExit: true, ...context.attrs },
        context.slots,
      );
  },
});
