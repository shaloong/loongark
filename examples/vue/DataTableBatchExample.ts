import { defineComponent, h } from "vue";
import { DataTableEditExample } from "./DataTableEditExample";
export const DataTableBatchExample = defineComponent({
  setup: () => () => h(DataTableEditExample, { complex: true, batch: true }),
});
