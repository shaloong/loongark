import React from "react";
import {
  LoongArkPasswordInputRoot,
  LoongArkPasswordInputLabel,
  LoongArkPasswordInputControl,
  LoongArkPasswordInputInput,
  LoongArkPasswordInputVisibilityTrigger,
} from "@loongark/react";
export function PasswordInputBasicExample() {
  return (
    <LoongArkPasswordInputRoot>
      <LoongArkPasswordInputLabel>密码</LoongArkPasswordInputLabel>
      <LoongArkPasswordInputControl>
        <LoongArkPasswordInputInput name="password" />
        <LoongArkPasswordInputVisibilityTrigger>
          显示 / 隐藏
        </LoongArkPasswordInputVisibilityTrigger>
      </LoongArkPasswordInputControl>
    </LoongArkPasswordInputRoot>
  );
}
