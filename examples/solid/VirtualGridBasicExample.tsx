/** @jsxImportSource solid-js */

import { LoongArkVirtualGrid } from "@loongark/solid";
export function VirtualGridBasicExample() {
  return (
    <LoongArkVirtualGrid
      label="数据网格"
      rowKeys={["a", "b", "c"]}
      columnKeys={["name", "amount"]}
      rowSize={48}
      columnSize={160}
      height={200}
      renderCell={({ rowKey, columnKey }) => rowKey + " / " + columnKey}
    />
  );
}
