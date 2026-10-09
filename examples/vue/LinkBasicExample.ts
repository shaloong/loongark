import { defineComponent, h } from "vue";
import { LoongArkLink } from "@loongark/vue";
export const LinkBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkLink,
        { href: "https://example.com" },
        { default: () => ["查看文档"] },
      );
    };
  },
});
