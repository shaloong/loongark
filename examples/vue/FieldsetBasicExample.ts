import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  type VNodeProps,
} from "vue";
import { LoongArkFieldset, LoongArkField } from "@loongark/vue";
import type { FieldInputProps } from "@ark-ui/vue/field";
export const FieldsetBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkFieldset.Root,
        {},
        {
          default: () => [
            h(LoongArkFieldset.Legend, {}, { default: () => ["联系方式"] }),
            h(
              LoongArkFieldset.HelperText,
              {},
              { default: () => ["请填写联系信息。"] },
            ),
            h(
              LoongArkField.Root,
              {},
              {
                default: () => [
                  h(LoongArkField.Label, {}, { default: () => ["姓名"] }),
                  createVNode(resolveDynamicComponent(LoongArkField.Input), {
                    ...({ name: "name" } satisfies FieldInputProps &
                      VNodeProps),
                  }),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
