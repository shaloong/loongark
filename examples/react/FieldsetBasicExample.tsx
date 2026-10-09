import React from "react";
import { LoongArkFieldset, LoongArkField } from "@loongark/react";
export function FieldsetBasicExample() {
  return (
    <LoongArkFieldset.Root>
      <LoongArkFieldset.Legend>联系方式</LoongArkFieldset.Legend>
      <LoongArkFieldset.HelperText>
        请填写联系信息。
      </LoongArkFieldset.HelperText>
      <LoongArkField.Root>
        <LoongArkField.Label>姓名</LoongArkField.Label>
        <LoongArkField.Input name="name" />
      </LoongArkField.Root>
    </LoongArkFieldset.Root>
  );
}
