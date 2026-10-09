import { defineComponent, h } from "vue";
import {
  LoongArkClipboardRoot,
  LoongArkClipboardLabel,
  LoongArkClipboardControl,
  LoongArkClipboardInput,
  LoongArkClipboardTrigger,
  LoongArkClipboardIndicator,
} from "@loongark/vue";
export const ClipboardBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkClipboardRoot,
        { value: "https://example.com" },
        {
          default: () => [
            h(LoongArkClipboardLabel, {}, { default: () => ["分享链接"] }),
            h(
              LoongArkClipboardControl,
              {},
              {
                default: () => [
                  h(LoongArkClipboardInput, {}),
                  h(LoongArkClipboardTrigger, {}, { default: () => ["复制"] }),
                ],
              },
            ),
            h(LoongArkClipboardIndicator, {}, { default: () => ["已复制"] }),
          ],
        },
      );
    };
  },
});
