import { defineComponent, h } from "vue";
import { LoongArkTypography } from "@loongark/vue";
export const TypographyBasicExample = defineComponent({
  setup() {
    return () => {
      return h("div", {}, [
        h(LoongArkTypography, { as: "h2" }, { default: () => ["项目说明"] }),
        h(LoongArkTypography, {}, { default: () => ["清晰的正文内容。"] }),
        h(
          LoongArkTypography,
          { variant: "muted" },
          { default: () => ["次要信息。"] },
        ),
      ]);
    };
  },
});
