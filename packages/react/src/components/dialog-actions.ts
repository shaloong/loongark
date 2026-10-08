import {
  createElement,
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
} from "react";
import { Dialog } from "@ark-ui/react/dialog";
import { dataProps } from "../data-props";
const action = (variant: "solid" | "outline") =>
  forwardRef<
    HTMLButtonElement,
    ComponentPropsWithoutRef<typeof Dialog.CloseTrigger>
  >((props, ref) => {
    const id = useId();
    return createElement(
      Dialog.CloseTrigger,
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
export const DialogAction = action("solid");
export const DialogCancel = action("outline");
