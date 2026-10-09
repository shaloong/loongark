import { defineComponent, h } from "vue";
import { LoongArkButtonGroup, LoongArkButton } from "@loongark/vue";
export const ButtonGroupBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkButtonGroup,
        {},
        {
          default: () => [
            h(
              LoongArkButton,
              { variant: "outline" },
              { default: () => ["保存草稿"] },
            ),
            h(LoongArkButton, {}, { default: () => ["发布"] }),
          ],
        },
      );
    };
  },
});
