import { defineComponent, h } from "vue";
import {
  LoongArkAvatarGroup,
  LoongArkAvatarRoot,
  LoongArkAvatarFallback,
  LoongArkAvatarGroupOverflow,
} from "@loongark/vue";
export const AvatarGroupBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkAvatarGroup,
        { "aria-label": "项目成员" },
        {
          default: () => [
            h(
              LoongArkAvatarRoot,
              {},
              {
                default: () => [
                  h(LoongArkAvatarFallback, {}, { default: () => ["LA"] }),
                ],
              },
            ),
            h(
              LoongArkAvatarRoot,
              {},
              {
                default: () => [
                  h(LoongArkAvatarFallback, {}, { default: () => ["JL"] }),
                ],
              },
            ),
            h(LoongArkAvatarGroupOverflow, {}, { default: () => ["+3"] }),
          ],
        },
      );
    };
  },
});
