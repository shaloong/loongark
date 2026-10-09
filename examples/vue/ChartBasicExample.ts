import { defineComponent, h } from "vue";
import { LoongArkChart } from "@loongark/vue";
export const ChartBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkChart, {
        title: "每月收入",
        type: "bar",
        labelKey: "month",
        data: [
          { month: "一月", amount: 20 },
          { month: "二月", amount: 35 },
        ],
        series: [{ key: "amount", label: "收入" }],
      });
    };
  },
});
