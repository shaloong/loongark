import { defineComponent, h } from "vue";
import { LoongArkAvatarRoot, LoongArkAvatarFallback } from "@loongark/vue";
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
