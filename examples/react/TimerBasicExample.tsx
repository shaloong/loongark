import React from "react";
import { LoongArkTimer } from "@loongark/react";
export function TimerBasicExample() {
  return (
    <LoongArkTimer.Root countdown startMs={60000}>
      <LoongArkTimer.Area>
        <LoongArkTimer.Item type="minutes" />
        <LoongArkTimer.Separator>:</LoongArkTimer.Separator>
        <LoongArkTimer.Item type="seconds" />
      </LoongArkTimer.Area>
      <LoongArkTimer.Control>
        <LoongArkTimer.ActionTrigger action="start">
          开始
        </LoongArkTimer.ActionTrigger>
        <LoongArkTimer.ActionTrigger action="pause">
          暂停
        </LoongArkTimer.ActionTrigger>
        <LoongArkTimer.ActionTrigger action="reset">
          重置
        </LoongArkTimer.ActionTrigger>
      </LoongArkTimer.Control>
    </LoongArkTimer.Root>
  );
}
