import React from "react";
import {
  LoongArkInputRoot,
  LoongArkInputLabel,
  LoongArkInputControl,
  LoongArkInputHelperText,
} from "@shaloong/loongark-react";
export function InputBasicExample() {
  return (
    <LoongArkInputRoot>
      <LoongArkInputLabel>邮箱</LoongArkInputLabel>
      <LoongArkInputControl
        name="email"
        type="email"
        placeholder="name@example.com"
      />
      <LoongArkInputHelperText>用于接收通知。</LoongArkInputHelperText>
    </LoongArkInputRoot>
  );
}
