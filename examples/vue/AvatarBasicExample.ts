import { defineComponent, h } from "vue";
import { LoongArkAvatarRoot, LoongArkAvatarFallback } from "@shaloong/loongark-vue";
export const AvatarBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkAvatarRoot,
        {},
        {
          default: () => [
            h(LoongArkAvatarFallback, {}, { default: () => ["LA"] }),
          ],
        },
      );
    };
  },
});
