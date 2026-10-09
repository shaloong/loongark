import React from "react";
import { LoongArkTransferList } from "@loongark/react";
export function TransferListBasicExample() {
  return (
    <LoongArkTransferList
      items={[
        { value: "design", label: "设计" },
        { value: "dev", label: "开发" },
      ]}
      defaultValue={["dev"]}
      name="members"
    />
  );
}
