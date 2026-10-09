import { defineComponent, h } from "vue";
import { LoongArkContainer } from "@loongark/vue";
export const ContainerBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkContainer,
        {},
        { default: () => [h("p", {}, ["居中的页面内容"])] },
      );
    };
  },
});
