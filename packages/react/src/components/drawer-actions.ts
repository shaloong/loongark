import {
  createElement,
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
} from "react";
import { Drawer } from "@ark-ui/react/drawer";
import { dataProps } from "../data-props";
const action = (variant: "solid" | "outline") =>
  forwardRef<
    HTMLButtonElement,
    ComponentPropsWithoutRef<typeof Drawer.CloseTrigger>
  >((props, ref) => {
    const id = useId();
    return createElement(
      Drawer.CloseTrigger,
      dataProps({
        ...props,
        ref,
        id: props.id ?? id,
        "data-scope": "button",
        "data-part": "root",
        "data-variant": variant,
        "data-size": "md",
      }),
    );
  });
export const DrawerAction = action("solid");
export const DrawerCancel = action("outline");
