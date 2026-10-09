import { defineComponent, h } from "vue";
import { LoongArkAttachment } from "@loongark/vue";
export const AttachmentBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkAttachment, {
        name: "说明.txt",
        size: 1024,
        href: "data:text/plain,Hello",
      });
    };
  },
});
