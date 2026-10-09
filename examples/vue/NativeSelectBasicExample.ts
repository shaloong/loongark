import { defineComponent, h } from "vue";
import { LoongArkNativeSelect } from "@loongark/vue";
export const NativeSelectBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkNativeSelect,
        { name: "plan", "aria-label": "方案" },
        {
          default: () => [
            h("option", { value: "free" }, ["免费方案"]),
            h("option", { value: "pro" }, ["专业方案与较长的选项名称"]),
          ],
        },
      );
    };
  },
});
