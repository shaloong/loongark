/** @jsxImportSource solid-js */
import { createSignal, Component } from "solid-js";
import {
  LoongArkSwitchHiddenInput,
  LoongArkSwitchRoot,
  LoongArkSwitchControl,
  LoongArkSwitchThumb,
  LoongArkSwitchLabel,
} from "@loongark/solid";

export interface SwitchExampleProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
}

export const SwitchExample: Component<SwitchExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const disabled = () => props.disabled ?? false;
  const label = () => props.label ?? "通知提醒";
  const [checked, setChecked] = createSignal(false);

  return (
    <LoongArkSwitchRoot
      size={size()}
      disabled={disabled()}
      checked={checked()}
      name="notifications"
      onCheckedChange={(detail: { checked: boolean }) =>
        setChecked(detail.checked)
      }
    >
      <LoongArkSwitchControl size={size()} disabled={disabled()}>
        <LoongArkSwitchThumb size={size()} />
      </LoongArkSwitchControl>
      <LoongArkSwitchLabel disabled={disabled()}>{label()}</LoongArkSwitchLabel>
      <LoongArkSwitchHiddenInput />
    </LoongArkSwitchRoot>
  );
};
