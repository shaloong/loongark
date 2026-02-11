import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkClipboardRoot,
  LoongArkClipboardLabel,
  LoongArkClipboardControl,
  LoongArkClipboardInput,
  LoongArkClipboardTrigger,
  LoongArkClipboardIndicator,
  LoongArkClipboardValueText,
} from "@loongark/vue";
import type { ClipboardSize } from "@loongark/primitives";

export const ClipboardExample = defineComponent({
  name: "ClipboardExample",
  props: {
    size: {
      type: String as PropType<ClipboardSize>,
      default: "md",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const value = ref("https://loongark.dev");

    return () =>
      h(
        LoongArkClipboardRoot,
        {
          size: props.size,
          disabled: props.disabled,
          value: value.value,
        },
        {
          default: () => [
            h(LoongArkClipboardLabel, null, {
              default: () => "Share link",
            }),
            h(LoongArkClipboardControl, null, {
              default: () => [
                h(LoongArkClipboardInput, {
                  value: value.value,
                  readOnly: props.disabled,
                  onInput: (event: Event) => {
                    value.value = (event.target as HTMLInputElement).value;
                  },
                }),
                h(
                  LoongArkClipboardTrigger,
                  { disabled: props.disabled },
                  { default: () => "Copy" }
                ),
              ],
            }),
            h(LoongArkClipboardIndicator, null, {
              default: () => "Copied",
            }),
            h(LoongArkClipboardValueText, null, {
              default: () => value.value,
            }),
          ],
        }
      );
  },
});
