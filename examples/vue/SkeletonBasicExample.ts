import { defineComponent, h } from "vue";
import { LoongArkStack, LoongArkSkeleton } from "@shaloong/loongark-vue";
export const SkeletonBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkStack,
        {},
        {
          default: () => [
            h(LoongArkSkeleton, {}),
            h(LoongArkSkeleton, {}),
            h("span", {}, ["内容正在加载"]),
          ],
        },
      );
    };
  },
});
