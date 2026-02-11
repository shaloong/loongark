import { defineComponent, h, type PropType } from "vue";
import { FileUploadContext } from "@ark-ui/vue/file-upload";
import {
  LoongArkFileUploadRoot,
  LoongArkFileUploadLabel,
  LoongArkFileUploadDropzone,
  LoongArkFileUploadTrigger,
  LoongArkFileUploadHiddenInput,
  LoongArkFileUploadItemGroup,
  LoongArkFileUploadItem,
  LoongArkFileUploadItemPreview,
  LoongArkFileUploadItemPreviewImage,
  LoongArkFileUploadItemName,
  LoongArkFileUploadItemSizeText,
  LoongArkFileUploadItemDeleteTrigger,
  LoongArkFileUploadClearTrigger,
} from "@loongark/vue";
import type { FileUploadSize } from "@loongark/primitives";

export const FileUploadExample = defineComponent({
  name: "FileUploadExample",
  props: {
    size: {
      type: String as PropType<FileUploadSize>,
      default: "md",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    return () =>
      h(
        LoongArkFileUploadRoot,
        {
          size: props.size,
          disabled: props.disabled,
          accept: { "image/*": [] },
          maxFiles: 3,
        },
        {
          default: () => [
            h(LoongArkFileUploadLabel, null, {
              default: () => "Upload files",
            }),
            h(LoongArkFileUploadDropzone, null, {
              default: () => [
                h("p", { style: "margin: 0;" }, "Drag files here"),
                h(LoongArkFileUploadTrigger, null, {
                  default: () => "Browse",
                }),
              ],
            }),
            h(LoongArkFileUploadHiddenInput),
            h(FileUploadContext, null, {
              default: (context: any) => {
                const files = context.acceptedFiles ?? [];
                return [
                  h(
                    LoongArkFileUploadItemGroup,
                    null,
                    {
                      default: () =>
                        files.map((file: File) =>
                          h(
                            LoongArkFileUploadItem,
                            { file, key: file.name },
                            {
                              default: () => [
                                h(LoongArkFileUploadItemPreview, null, {
                                  default: () =>
                                    h(LoongArkFileUploadItemPreviewImage),
                                }),
                                h("div", null, [
                                  h(LoongArkFileUploadItemName),
                                  h(LoongArkFileUploadItemSizeText),
                                ]),
                                h(LoongArkFileUploadItemDeleteTrigger, null, {
                                  default: () => "Remove",
                                }),
                              ],
                            }
                          )
                        ),
                    }
                  ),
                  files.length > 0
                    ? h(LoongArkFileUploadClearTrigger, null, {
                        default: () => "Clear all",
                      })
                    : null,
                ];
              },
            }),
          ],
        }
      );
  },
});
