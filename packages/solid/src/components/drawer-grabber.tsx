import type { ComponentProps } from "solid-js";
import { Drawer } from "@ark-ui/solid/drawer";
import { mergeProps } from "@zag-js/solid";
import { preventDrawerGrabberSelection } from "@loongark/kit";

export const DrawerGrabber = (props: ComponentProps<typeof Drawer.Grabber>) => (
  <Drawer.Grabber
    {...mergeProps(props, { onPointerDown: preventDrawerGrabberSelection })}
  />
);
