import { defineComponent, h, ref } from "vue";
import { LoongArkButton, LoongArkPresence } from "@loongark/vue";
export const PresenceBasicExample = defineComponent({
  setup() {
    const visible = ref(false);
    return () => {
      return h("div", {}, [
        h(
          LoongArkButton,
          {
            "aria-expanded": visible.value,
            onClick: () => (visible.value = !visible.value),
          },
          { default: () => ["显示 / 隐藏"] },
        ),
        h(
          LoongArkPresence,
          { present: visible.value, lazyMount: true, unmountOnExit: true },
          { default: () => [h("p", {}, ["按需挂载的内容。"])] },
        ),
      ]);
    };
  },
});
