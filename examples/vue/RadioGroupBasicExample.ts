import { defineComponent, h } from "vue";
import {
  LoongArkRadioGroupRoot,
  LoongArkRadioGroupLabel,
  LoongArkRadioGroupItem,
  LoongArkRadioGroupItemControl,
  LoongArkRadioGroupItemText,
  LoongArkRadioGroupItemHiddenInput,
} from "@loongark/vue";
export const RadioGroupBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkRadioGroupRoot,
        { name: "plan", defaultValue: "basic" },
        {
          default: () => [
            h(LoongArkRadioGroupLabel, {}, { default: () => ["方案"] }),
            h(
              LoongArkRadioGroupItem,
              { value: "basic" },
              {
                default: () => [
                  h(LoongArkRadioGroupItemControl, {}),
                  h(
                    LoongArkRadioGroupItemText,
                    {},
                    { default: () => ["基础"] },
                  ),
                  h(LoongArkRadioGroupItemHiddenInput, {}),
                ],
              },
            ),
            h(
              LoongArkRadioGroupItem,
              { value: "pro" },
              {
                default: () => [
                  h(LoongArkRadioGroupItemControl, {}),
                  h(
                    LoongArkRadioGroupItemText,
                    {},
                    { default: () => ["专业"] },
                  ),
                  h(LoongArkRadioGroupItemHiddenInput, {}),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
