import React from "react";
import {
  LoongArkPinInputRoot,
  LoongArkPinInputLabel,
  LoongArkPinInputControl,
  LoongArkPinInputInput,
  LoongArkPinInputHiddenInput,
} from "@loongark/react";
export function PinInputBasicExample() {
  return (
    <LoongArkPinInputRoot>
      <LoongArkPinInputLabel>验证码</LoongArkPinInputLabel>
      <LoongArkPinInputControl>
        <LoongArkPinInputInput index={0} />
        <LoongArkPinInputInput index={1} />
        <LoongArkPinInputInput index={2} />
        <LoongArkPinInputInput index={3} />
      </LoongArkPinInputControl>
      <LoongArkPinInputHiddenInput name="code" />
    </LoongArkPinInputRoot>
  );
}
