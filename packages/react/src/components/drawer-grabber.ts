import { createElement, forwardRef, type ComponentPropsWithoutRef } from "react";
import { Drawer } from "@ark-ui/react/drawer";
import { mergeProps } from "@zag-js/react";
import { preventDrawerGrabberSelection } from "@loongark/kit";

export const DrawerGrabber = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Drawer.Grabber>
>((props, ref) =>
  createElement(Drawer.Grabber, {
    ...mergeProps(props, { onPointerDown: preventDrawerGrabberSelection }),
    ref,
  }),
);
