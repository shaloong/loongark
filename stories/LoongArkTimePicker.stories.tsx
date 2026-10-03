import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
const meta = {
  title: "Components/TimePicker",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%,360px)" }}>
      <L.LoongArkTimePicker
        defaultValue="09:30"
        minuteStep={15}
        min="08:00"
        max="18:00"
        locale="zh-CN"
      />
    </div>
  ),
};
export const NightShift: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%,360px)" }}>
      <L.LoongArkTimePicker
        label="Night shift"
        defaultValue="23:30"
        min="22:00"
        max="02:00"
        minuteStep={30}
        hourCycle="h12"
      />
    </div>
  ),
};
export const States: StoryObj = {
  render: () => (
    <L.LoongArkStack style={{ width: "min(100%,360px)" }}>
      <L.LoongArkTimePicker
        label="Read-only time"
        defaultValue="09:30"
        readOnly
      />
      <L.LoongArkTimePicker
        label="Disabled time"
        defaultValue="09:30"
        disabled
      />
      <L.LoongArkTimePicker
        label="Out-of-range time"
        defaultValue="06:00"
        min="08:00"
        max="18:00"
      />
    </L.LoongArkStack>
  ),
};
