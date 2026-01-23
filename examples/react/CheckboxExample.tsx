import React, { useState } from "react";
import {
  LoongArkCheckboxRoot,
  LoongArkCheckboxControl,
  LoongArkCheckboxLabel,
  LoongArkCheckboxIndicator,
  LoongArkCheckboxHiddenInput,
} from "@loongark/react";
import type { CheckboxSize } from "@loongark/primitives";

export interface CheckboxExampleProps {
  size?: CheckboxSize;
  disabled?: boolean;
  label?: string;
}

export const CheckboxExample: React.FC<CheckboxExampleProps> = ({
  size = "md",
  disabled = false,
  label = "同意条款",
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <LoongArkCheckboxRoot
        size={size}
        disabled={disabled}
        checked={checked}
        onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
          setChecked(details.checked === true)
        }
      >
        <LoongArkCheckboxControl size={size}>
          <LoongArkCheckboxIndicator />
        </LoongArkCheckboxControl>
        <LoongArkCheckboxLabel>{label}</LoongArkCheckboxLabel>
        <LoongArkCheckboxHiddenInput />
      </LoongArkCheckboxRoot>

      <p style={{ marginTop: "12px", fontSize: "14px", color: "#666" }}>
        状态: {checked ? "已选中" : "未选中"}
      </p>
    </div>
  );
};
