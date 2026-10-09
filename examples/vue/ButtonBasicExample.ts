import { defineComponent, h } from "vue";
import { LoongArkButton } from "@loongark/vue";
export const ButtonBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkButton, { type: "submit" }, { default: () => ["保存"] });
    };
  },
});
