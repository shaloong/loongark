import React from "react";
import { LoongArkQrCode } from "@loongark/react";
export function QRCodeBasicExample() {
  return (
    <LoongArkQrCode.Root value="https://shaloong.github.io/loongark/">
      <LoongArkQrCode.Frame>
        <LoongArkQrCode.Pattern />
      </LoongArkQrCode.Frame>
      <LoongArkQrCode.DownloadTrigger
        mimeType="image/png"
        fileName="loongark.png"
      >
        下载二维码
      </LoongArkQrCode.DownloadTrigger>
    </LoongArkQrCode.Root>
  );
}
