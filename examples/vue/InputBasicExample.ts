import { defineComponent, h } from "vue";
import {
  LoongArkInputRoot,
  LoongArkInputLabel,
  LoongArkInputControl,
  LoongArkInputHelperText,
} from "@loongark/vue";
export const InputBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkInputRoot,
        {},
        {
          default: () => [
            h(LoongArkInputLabel, {}, { default: () => ["邮箱"] }),
            h(LoongArkInputControl, {
              name: "email",
              type: "email",
              placeholder: "name@example.com",
            }),
            h(
              LoongArkInputHelperText,
              {},
              { default: () => ["用于接收通知。"] },
            ),
          ],
        },
      );
    };
  },
});
