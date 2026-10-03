import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkTimeline>
      {["创建项目", "完成设计", "等待发布"].map((t, i) => (
        <L.LoongArkTimelineItem key={t}>
          <L.LoongArkTimelineIndicator>{i + 1}</L.LoongArkTimelineIndicator>
          <L.LoongArkTimelineContent>
            <L.LoongArkTimelineTitle>{t}</L.LoongArkTimelineTitle>
            <L.LoongArkTimelineDescription>
              团队协作流程记录。
            </L.LoongArkTimelineDescription>
            <L.LoongArkTimelineTime
              dateTime={
                "2026-10-03T" + String(i + 8).padStart(2, "0") + ":00:00+08:00"
              }
            >
              {8 + i}:00
            </L.LoongArkTimelineTime>
          </L.LoongArkTimelineContent>
        </L.LoongArkTimelineItem>
      ))}
    </L.LoongArkTimeline>
  );
}
const meta = {
  title: "Components/Timeline",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%,720px)" }}>
      <Demo />
    </div>
  ),
};
