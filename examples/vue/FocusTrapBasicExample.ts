import { defineComponent, h, ref } from "vue";
import { LoongArkButton, LoongArkFocusTrap } from "@loongark/vue";
export const FocusTrapBasicExample = defineComponent({
  setup() {
    const active = ref(false);
    return () => {
      return h("div", {}, [
        h(
          LoongArkButton,
          { onClick: () => (active.value = true) },
          { default: () => ["开始编辑"] },
        ),
        active.value &&
          h(
            LoongArkFocusTrap,
            { returnFocusOnDeactivate: true },
            {
              default: () => [
                h("div", {}, [
                  h("label", { htmlFor: "task-name" }, ["任务名"]),
                  h("input", { id: "task-name" }),
                  h(
                    LoongArkButton,
                    { onClick: () => (active.value = false) },
                    { default: () => ["完成"] },
                  ),
                ]),
              ],
            },
          ),
      ]);
    };
  },
});
