/** @jsxImportSource solid-js */

import {
  LoongArkPasswordInputRoot,
  LoongArkPasswordInputLabel,
  LoongArkPasswordInputControl,
  LoongArkPasswordInputInput,
  LoongArkPasswordInputVisibilityTrigger,
} from "@loongark/solid";
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
