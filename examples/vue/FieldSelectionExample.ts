import { defineComponent, h } from "vue";
import { SelectionControlsExample } from "./SelectionControlsExample";
export const FieldSelectionExample = defineComponent({
  name: "FieldSelectionExample",
  setup: () => () => h(SelectionControlsExample, { field: true }),
});
