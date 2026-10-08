import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Empty",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkEmpty>
        <L.LoongArkEmptyHeader>
          <L.LoongArkEmptyTitle>No projects yet</L.LoongArkEmptyTitle>
          <L.LoongArkEmptyDescription>
            Create a project to get started.
          </L.LoongArkEmptyDescription>
        </L.LoongArkEmptyHeader>
        <L.LoongArkEmptyContent>
          <L.LoongArkButton>Create project</L.LoongArkButton>
        </L.LoongArkEmptyContent>
      </L.LoongArkEmpty>
    </div>
  ),
};
