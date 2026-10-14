import { defineComponent, h } from "vue";
import { LoongArkBadge } from "@shaloong/loongark-vue";
export const BadgeBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkBadge,
        { variant: "outline" },
        { default: () => ["已发布"] },
      );
    };
  },
});
