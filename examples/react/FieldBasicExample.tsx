import React from "react";
import { LoongArkField } from "@loongark/react";
export function FieldBasicExample() {
  return (
    <LoongArkField.Root required>
      <LoongArkField.Label>
        邮箱
        <LoongArkField.RequiredIndicator />
      </LoongArkField.Label>
      <LoongArkField.Input type="email" name="email" />
      <LoongArkField.HelperText>用于接收通知。</LoongArkField.HelperText>
    </LoongArkField.Root>
  );
}
