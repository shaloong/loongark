import React, { useState } from "react";
import {
  LoongArkSwitch,
  LoongArkSwitchRoot,
  LoongArkSwitchControl,
  LoongArkSwitchThumb,
  LoongArkSwitchLabel,
} from "@loongark/react";

export interface SwitchExampleProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
}

export const SwitchExample: React.FC<SwitchExampleProps> = ({
  size = "md",
  disabled = false,
  label = "通知提醒",
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <LoongArkSwitchRoot
      size={size}
      disabled={disabled}
      data-testid="switch-root"
    >
      <LoongArkSwitchControl
        size={size}
        disabled={disabled}
        data-testid="switch-control"
        checked={checked}
        onCheckedChange={(detail: { checked: boolean }) =>
          setChecked(detail.checked)
        }
      >
        <LoongArkSwitchThumb size={size} data-testid="switch-thumb" />
      </LoongArkSwitchControl>
      <LoongArkSwitchLabel disabled={disabled} data-testid="switch-label">
        {label}
      </LoongArkSwitchLabel>
      <LoongArkSwitch.HiddenInput />
    </LoongArkSwitchRoot>
  );
};
