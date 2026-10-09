/** @jsxImportSource solid-js */

import { LoongArkDataTable } from "@loongark/solid";
export function DataTableBasicExample() {
  return (
    <LoongArkDataTable
      label="项目列表"
      data={[
        { id: "a", name: "项目一", amount: 20 },
        { id: "b", name: "项目二", amount: 35 },
      ]}
      columns={[
        { key: "name", label: "项目" },
        { key: "amount", label: "收入" },
      ]}
    />
  );
}
