/** @jsxImportSource solid-js */

import { LoongArkSpeedDial } from "@loongark/solid";
export function SpeedDialBasicExample() {
  return (
    <LoongArkSpeedDial
      label="快捷操作"
      actions={[
        { value: "new", label: "新建" },
        { value: "search", label: "搜索" },
      ]}
    />
  );
}
