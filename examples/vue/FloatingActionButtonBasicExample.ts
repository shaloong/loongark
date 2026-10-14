import { defineComponent, h } from "vue";
import { LoongArkFloatingActionButton } from "@shaloong/loongark-vue";
export const FloatingActionButtonBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkFloatingActionButton,
        { extended: true },
        { default: () => ["新建项目"] },
      );
    };
  },
});
