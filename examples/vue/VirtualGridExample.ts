import { defineComponent, h } from "vue";
import { VirtualLayoutDemo } from "./virtualLayoutDemo";
export const VirtualGridExample = defineComponent({
  setup: () => () => h(VirtualLayoutDemo, { kind: "grid" }),
});
