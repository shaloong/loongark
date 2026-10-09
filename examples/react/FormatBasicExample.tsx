import React from "react";
import {
  LoongArkLocaleProvider,
  LoongArkFormatByte,
  LoongArkFormatNumber,
} from "@loongark/react";
export function FormatBasicExample() {
  return (
    <LoongArkLocaleProvider locale="zh-CN">
      <dl>
        <dt>文件大小</dt>
        <dd>
          <LoongArkFormatByte value={2048} unitSystem="binary" />
        </dd>
        <dt>预算</dt>
        <dd>
          <LoongArkFormatNumber value={1250} style="currency" currency="CNY" />
        </dd>
      </dl>
    </LoongArkLocaleProvider>
  );
}
