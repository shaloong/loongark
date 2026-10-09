/** @jsxImportSource solid-js */

import { LoongArkTimePicker } from "@loongark/solid";
export function TimePickerBasicExample() {
  return (
    <LoongArkTimePicker
      label="会议时间"
      name="meeting"
      defaultValue="09:30"
      minuteStep={15}
    />
  );
}
