import { defineComponent, h, ref } from "vue";
import { LoongArkProviderCore } from "@loongark/vue/provider-core";
import { LoongArkButton } from "@loongark/vue/button";
import { createPrimitiveStyleBootstrap } from "@loongark/primitives/styles";
import { buttonPrimitive } from "@loongark/primitives/button";
const styleBootstrap = createPrimitiveStyleBootstrap([buttonPrimitive]);
export const CoreProviderExample = defineComponent({
  setup() {
    const mode = ref<"light" | "dark">("light");
    return () =>
      h(LoongArkProviderCore, { mode: mode.value, styleBootstrap }, () =>
        h(
          "div",
          {
            style: {
              padding: "16px",
              background: "var(--lk-color-semantic-background)",
              color: "var(--lk-color-semantic-foreground)",
            },
          },
          [
            h(
              LoongArkButton,
              {
                onClick: () =>
                  (mode.value = mode.value === "light" ? "dark" : "light"),
              },
              () => "切换轻量主题",
            ),
          ],
        ),
      );
  },
});
