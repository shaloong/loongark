import { defineComponent, h } from "vue";
import {
  LoongArkNumberInputRoot,
  LoongArkNumberInputLabel,
  LoongArkNumberInputControl,
  LoongArkNumberInputInput,
  LoongArkNumberInputIncrementTrigger,
  LoongArkNumberInputDecrementTrigger,
} from "@loongark/vue";
export const NumberInputBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkNumberInputRoot,
        { defaultValue: "1", min: 0, max: 10 },
        {
          default: () => [
            h(LoongArkNumberInputLabel, {}, { default: () => ["数量"] }),
            h(
              LoongArkNumberInputControl,
              {},
              {
                default: () => [
                  h(LoongArkNumberInputInput, {}),
                  h(LoongArkNumberInputIncrementTrigger, {
                    "aria-label": "增加",
                  }),
                  h(LoongArkNumberInputDecrementTrigger, {
                    "aria-label": "减少",
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
