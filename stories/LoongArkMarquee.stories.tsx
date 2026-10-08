import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Marquee",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkMarquee.Root>
        <L.LoongArkMarquee.Viewport>
          <L.LoongArkMarquee.Content>
            {["React", "Vue", "Solid", "Svelte"].map((item) => (
              <L.LoongArkMarquee.Item key={item}>
                <L.LoongArkBadge variant="outline">{item}</L.LoongArkBadge>
              </L.LoongArkMarquee.Item>
            ))}
          </L.LoongArkMarquee.Content>
        </L.LoongArkMarquee.Viewport>
      </L.LoongArkMarquee.Root>
    </div>
  ),
};
