import { defineComponent, h } from "vue";
import { LoongArkDownloadTrigger } from "@loongark/vue";
export const DownloadTriggerBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkDownloadTrigger,
        { fileName: "notes.txt", mimeType: "text/plain", data: "组件使用说明" },
        { default: () => ["下载说明"] },
      );
    };
  },
});
