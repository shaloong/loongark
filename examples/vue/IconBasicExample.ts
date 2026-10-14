import { defineComponent, h } from "vue";
import { LoongArkIcon } from "@shaloong/loongark-vue";
import { controlIcons } from "@shaloong/loongark-kit";
export const IconBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkIcon, {
        icon: controlIcons.search,
        "aria-label": "搜索",
      });
    };
  },
});
