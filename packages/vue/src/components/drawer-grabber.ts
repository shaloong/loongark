import { defineComponent, mergeProps } from "vue";
import { Drawer } from "@ark-ui/vue/drawer";
import { useForwardExpose } from "@ark-ui/vue/utils";
import { preventDrawerGrabberSelection } from "@loongark/kit";
import { renderPart } from "../render-part";

export const DrawerGrabber = defineComponent<Drawer.GrabberProps>({
  inheritAttrs: false,
  setup(_, context) {
    useForwardExpose();
    return () =>
      renderPart(
        Drawer.Grabber,
        mergeProps(context.attrs, {
          onPointerdown: preventDrawerGrabberSelection,
        }),
        context.slots,
      );
  },
});
