import { defineComponent, h } from "vue";
import {
  LoongArkPasswordInputRoot,
  LoongArkPasswordInputLabel,
  LoongArkPasswordInputControl,
  LoongArkPasswordInputInput,
  LoongArkPasswordInputVisibilityTrigger,
} from "@loongark/vue";
export const PasswordInputBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkPasswordInputRoot,
        {},
        {
          default: () => [
            h(LoongArkPasswordInputLabel, {}, { default: () => ["密码"] }),
            h(
              LoongArkPasswordInputControl,
              {},
              {
                default: () => [
                  h(LoongArkPasswordInputInput, { name: "password" }),
                  h(
                    LoongArkPasswordInputVisibilityTrigger,
                    {},
                    { default: () => ["显示 / 隐藏"] },
                  ),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
