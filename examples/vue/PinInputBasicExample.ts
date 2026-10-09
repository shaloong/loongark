import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  type VNodeProps,
} from "vue";
import {
  LoongArkPinInputRoot,
  LoongArkPinInputLabel,
  LoongArkPinInputControl,
  LoongArkPinInputInput,
  LoongArkPinInputHiddenInput,
} from "@loongark/vue";
import type { PinInputHiddenInputProps } from "@ark-ui/vue/pin-input";
export const PinInputBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkPinInputRoot,
        {},
        {
          default: () => [
            h(LoongArkPinInputLabel, {}, { default: () => ["验证码"] }),
            h(
              LoongArkPinInputControl,
              {},
              {
                default: () => [
                  h(LoongArkPinInputInput, { index: 0 }),
                  h(LoongArkPinInputInput, { index: 1 }),
                  h(LoongArkPinInputInput, { index: 2 }),
                  h(LoongArkPinInputInput, { index: 3 }),
                ],
              },
            ),
            createVNode(resolveDynamicComponent(LoongArkPinInputHiddenInput), {
              ...({ name: "code" } satisfies PinInputHiddenInputProps &
                VNodeProps),
            }),
          ],
        },
      );
    };
  },
});
