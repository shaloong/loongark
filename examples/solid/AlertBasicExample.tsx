/** @jsxImportSource solid-js */

import {
  LoongArkAlert,
  LoongArkAlertTitle,
  LoongArkAlertDescription,
} from "@loongark/solid";
export function AlertBasicExample() {
  return (
    <LoongArkAlert>
      <LoongArkAlertTitle>设置已保存</LoongArkAlertTitle>
      <LoongArkAlertDescription>当前修改已经生效。</LoongArkAlertDescription>
    </LoongArkAlert>
  );
}
