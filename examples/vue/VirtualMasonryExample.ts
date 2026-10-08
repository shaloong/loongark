import { defineComponent, h } from "vue";
import { VirtualLayoutDemo } from "./virtualLayoutDemo";
export const VirtualMasonryExample = defineComponent({
  setup: () => () => h(VirtualLayoutDemo, { kind: "masonry" }),
});
