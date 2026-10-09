import { defineComponent, h } from "vue";
import { LoongArkCodeEditor } from "@loongark/vue";
export const CodeEditorBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkCodeEditor, {
        label: "示例代码",
        language: "typescript",
        defaultValue: "const greeting = 'Hello';",
      });
    };
  },
});
