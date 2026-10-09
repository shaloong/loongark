import { defineComponent, h } from "vue";
import { LoongArkSpeedDial } from "@loongark/vue";
export const SpeedDialBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkSpeedDial, {
        label: "快捷操作",
        actions: [
          { value: "new", label: "新建" },
          { value: "search", label: "搜索" },
        ],
      });
    };
  },
});
