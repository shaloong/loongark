import { renderPart } from "../render-part";
import { defineComponent, h, Teleport } from "vue";
import { useOptionalTheme } from "../provider";
export const LoongArkPortal = defineComponent({
  name: "LoongArkPortal",
  props: { disabled: { type: Boolean, default: false } },
  setup(props, { slots }) {
    const theme = useOptionalTheme();
    return () =>
      renderPart(
        Teleport,
        {
          to: theme()?.getPortalContainer() ?? "body",
          disabled: props.disabled,
        },
        slots,
      );
  },
});
