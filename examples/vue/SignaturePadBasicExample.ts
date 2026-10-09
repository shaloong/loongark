import { defineComponent, h } from "vue";
import { LoongArkSignaturePad } from "@loongark/vue";
export const SignaturePadBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkSignaturePad.Root,
        {},
        {
          default: () => [
            h(LoongArkSignaturePad.Label, {}, { default: () => ["签名"] }),
            h(
              LoongArkSignaturePad.Control,
              {},
              {
                default: () => [
                  h(LoongArkSignaturePad.Segment, {}),
                  h(LoongArkSignaturePad.Guide, {}),
                ],
              },
            ),
            h(
              LoongArkSignaturePad.ClearTrigger,
              {},
              { default: () => ["清除签名"] },
            ),
          ],
        },
      );
    };
  },
});
