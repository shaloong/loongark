import { defineComponent, h } from "vue";
import { LoongArkRichTextEditor } from "@loongark/vue";
export const RichTextEditorBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkRichTextEditor, {
        label: "项目备注",
        defaultValue: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "开始记录项目想法。" }],
            },
          ],
        },
      });
    };
  },
});
