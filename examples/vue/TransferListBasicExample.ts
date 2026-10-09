import { defineComponent, h } from "vue";
import { LoongArkTransferList } from "@loongark/vue";
export const TransferListBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkTransferList, {
        items: [
          { value: "design", label: "设计" },
          { value: "dev", label: "开发" },
        ],
        defaultValue: ["dev"],
        name: "members",
      });
    };
  },
});
