import { defineComponent, h } from "vue";
import { LoongArkQrCode } from "@loongark/vue";
export const QRCodeBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkQrCode.Root,
        { value: "https://shaloong.github.io/loongark/" },
        {
          default: () => [
            h(
              LoongArkQrCode.Frame,
              {},
              { default: () => [h(LoongArkQrCode.Pattern, {})] },
            ),
            h(
              LoongArkQrCode.DownloadTrigger,
              { mimeType: "image/png", fileName: "loongark.png" },
              { default: () => ["下载二维码"] },
            ),
          ],
        },
      );
    };
  },
});
