import { defineComponent, h } from "vue";
import { DataTableEditExample } from "./DataTableEditExample";
export const DataTableComplexEditorsExample = defineComponent({
  setup: () => () => h(DataTableEditExample, { complex: true }),
});
