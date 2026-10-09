import React from "react";
import { LoongArkDownloadTrigger } from "@loongark/react";
export function DownloadTriggerBasicExample() {
  return (
    <LoongArkDownloadTrigger
      fileName="notes.txt"
      mimeType="text/plain"
      data="组件使用说明"
    >
      下载说明
    </LoongArkDownloadTrigger>
  );
}
