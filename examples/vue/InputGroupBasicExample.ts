import { defineComponent, h } from "vue";
import {
  LoongArkInputRoot,
  LoongArkInputLabel,
  LoongArkInputGroup,
  LoongArkInputPrefix,
  LoongArkInputControl,
} from "@loongark/vue";
export const InputGroupBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkInputRoot,
        {},
        {
          default: () => [
            h(LoongArkInputLabel, {}, { default: () => ["网站"] }),
            h(
              LoongArkInputGroup,
              {},
              {
                default: () => [
                  h(LoongArkInputPrefix, {}, { default: () => ["https://"] }),
                  h(LoongArkInputControl, {
                    name: "website",
                    placeholder: "example.com",
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
