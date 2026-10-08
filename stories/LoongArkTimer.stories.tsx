import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Timer",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkTimer.Root countdown startMs={60000}>
        <L.LoongArkTimer.Area>
          <L.LoongArkTimer.Item type="minutes" />
          <L.LoongArkTimer.Separator>:</L.LoongArkTimer.Separator>
          <L.LoongArkTimer.Item type="seconds" />
        </L.LoongArkTimer.Area>
        <L.LoongArkTimer.Control>
          <L.LoongArkTimer.ActionTrigger action="start">
            Start
          </L.LoongArkTimer.ActionTrigger>
          <L.LoongArkTimer.ActionTrigger action="pause">
            Pause
          </L.LoongArkTimer.ActionTrigger>
          <L.LoongArkTimer.ActionTrigger action="reset">
            Reset
          </L.LoongArkTimer.ActionTrigger>
        </L.LoongArkTimer.Control>
      </L.LoongArkTimer.Root>
    </div>
  ),
};
