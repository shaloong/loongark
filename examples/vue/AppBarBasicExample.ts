import { defineComponent, h } from "vue";
import { LoongArkAppBar, LoongArkToolbar, LoongArkLink } from "@loongark/vue";
export const AppBarBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkAppBar,
        {},
        {
          default: () => [
            h(
              LoongArkToolbar,
              {},
              {
                default: () => [
                  h("strong", {}, ["工作区"]),
                  h(
                    LoongArkLink,
                    { href: "#projects" },
                    { default: () => ["项目"] },
                  ),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
