import { defineComponent, h } from "vue";
import {
  LoongArkFileUploadRoot,
  LoongArkFileUploadLabel,
  LoongArkFileUploadDropzone,
  LoongArkFileUploadTrigger,
  LoongArkFileUploadHiddenInput,
} from "@loongark/vue";
export const FileUploadBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkFileUploadRoot,
        { maxFiles: 1 },
        {
          default: () => [
            h(LoongArkFileUploadLabel, {}, { default: () => ["上传文件"] }),
            h(
              LoongArkFileUploadDropzone,
              {},
              {
                default: () => [
                  "将文件拖到这里",
                  h(
                    LoongArkFileUploadTrigger,
                    {},
                    { default: () => ["选择文件"] },
                  ),
                ],
              },
            ),
            h(LoongArkFileUploadHiddenInput, {}),
          ],
        },
      );
    };
  },
});
