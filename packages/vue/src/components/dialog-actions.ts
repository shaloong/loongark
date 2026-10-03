import { defineComponent, useId } from "vue";
import { Dialog } from "@ark-ui/vue/dialog";
import { renderPart } from "../render-part";
const action = (variant: "solid" | "outline") =>
  defineComponent<Dialog.CloseTriggerProps>({
    inheritAttrs: false,
    setup(_, context) {
      const id = useId();
      return () =>
        renderPart(
          Dialog.CloseTrigger,
          {
            ...context.attrs,
            id: typeof context.attrs.id === "string" ? context.attrs.id : id,
            "data-scope": "button",
            "data-part": "root",
            "data-variant": variant,
            "data-size": "md",
          },
          context.slots,
        );
    },
  });
export const DialogAction = action("solid");
export const DialogCancel = action("outline");
