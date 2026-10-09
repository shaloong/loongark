/** @jsxImportSource solid-js */

import {
  LoongArkSwitchRoot,
  LoongArkSwitchLabel,
  LoongArkSwitchControl,
  LoongArkSwitchThumb,
  LoongArkSwitchHiddenInput,
} from "@loongark/solid";
export function SwitchBasicExample() {
  return (
    <LoongArkSwitchRoot name="notifications">
      <LoongArkSwitchLabel>接收通知</LoongArkSwitchLabel>
      <LoongArkSwitchControl>
        <LoongArkSwitchThumb />
      </LoongArkSwitchControl>
      <LoongArkSwitchHiddenInput />
    </LoongArkSwitchRoot>
  );
}
