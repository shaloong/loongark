import React from "react";
import { LoongArkMessage, LoongArkBubble } from "@loongark/react";
export function MessageBasicExample() {
  return (
    <LoongArkMessage
      author="小林"
      dateTime="2026-10-09T09:30:00+08:00"
      timeLabel="09:30"
    >
      <LoongArkBubble>你好，请查看项目说明。</LoongArkBubble>
    </LoongArkMessage>
  );
}
