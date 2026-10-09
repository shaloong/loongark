import React from "react";
import {
  LoongArkAlert,
  LoongArkAlertTitle,
  LoongArkAlertDescription,
} from "@loongark/react";
export function AlertBasicExample() {
  return (
    <LoongArkAlert>
      <LoongArkAlertTitle>设置已保存</LoongArkAlertTitle>
      <LoongArkAlertDescription>当前修改已经生效。</LoongArkAlertDescription>
    </LoongArkAlert>
  );
}
