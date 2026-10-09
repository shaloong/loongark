import { defineComponent, h } from "vue";
import {
  LoongArkCheckboxRoot,
  LoongArkCheckboxControl,
  LoongArkCheckboxIndicator,
  LoongArkCheckboxLabel,
  LoongArkCheckboxHiddenInput,
} from "@loongark/vue";
export const CheckboxBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkCheckboxRoot,
        { name: "terms" },
        {
          default: () => [
            h(
              LoongArkCheckboxControl,
              {},
              { default: () => [h(LoongArkCheckboxIndicator, {})] },
            ),
            h(LoongArkCheckboxLabel, {}, { default: () => ["同意条款"] }),
            h(LoongArkCheckboxHiddenInput, {}),
          ],
        },
      );
    };
  },
});
