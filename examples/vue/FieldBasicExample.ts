import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  type VNodeProps,
} from "vue";
import { LoongArkField } from "@loongark/vue";
import type { FieldInputProps } from "@ark-ui/vue/field";
export const FieldBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkField.Root,
        { required: true },
        {
          default: () => [
            h(
              LoongArkField.Label,
              {},
              {
                default: () => ["邮箱", h(LoongArkField.RequiredIndicator, {})],
              },
            ),
            createVNode(resolveDynamicComponent(LoongArkField.Input), {
              ...({ type: "email", name: "email" } satisfies FieldInputProps &
                VNodeProps),
            }),
            h(
              LoongArkField.HelperText,
              {},
              { default: () => ["用于接收通知。"] },
            ),
          ],
        },
      );
    };
  },
});
