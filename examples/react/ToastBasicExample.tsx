import React, { useState } from "react";
import * as L from "@loongark/react";

export function ToastBasicExample() {
  const [toaster] = useState(() =>
    L.createToaster({ placement: "bottom-end" }),
  );
  return (
    <div>
      <L.LoongArkButton
        onClick={() => toaster.create({ title: "已保存", closable: true })}
      >
        显示通知
      </L.LoongArkButton>
      <L.LoongArkToaster toaster={toaster}>
        {(toast) => (
          <L.LoongArkToastRoot>
            <L.LoongArkToastTitle>{toast.title}</L.LoongArkToastTitle>
            <L.LoongArkToastCloseTrigger aria-label="关闭">关闭</L.LoongArkToastCloseTrigger>
          </L.LoongArkToastRoot>
        )}
      </L.LoongArkToaster>
    </div>
  );
}
