/** @jsxImportSource solid-js */

import { LoongArkDownloadTrigger } from "@loongark/solid";
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
