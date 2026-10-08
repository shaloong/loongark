import { defineComponent, useId } from "vue";
import { Drawer } from "@ark-ui/vue/drawer";
import { renderPart } from "../render-part";
const action = (variant: "solid" | "outline") =>
  defineComponent<Drawer.CloseTriggerProps>({
    inheritAttrs: false,
    setup(_, context) {
      const id = useId();
      return () =>
        renderPart(
          Drawer.CloseTrigger,
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
export const DrawerAction = action("solid");
export const DrawerCancel = action("outline");
