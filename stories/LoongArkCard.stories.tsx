import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Card",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkCard>
        <L.LoongArkCardHeader>
          <L.LoongArkCardTitle>Create project</L.LoongArkCardTitle>
          <L.LoongArkCardDescription>
            Deploy a new project in one click.
          </L.LoongArkCardDescription>
        </L.LoongArkCardHeader>
        <L.LoongArkCardContent>
          <L.LoongArkInputRoot>
            <L.LoongArkInputLabel>Name</L.LoongArkInputLabel>
            <L.LoongArkInputControl placeholder="Project name" />
          </L.LoongArkInputRoot>
        </L.LoongArkCardContent>
        <L.LoongArkCardFooter>
          <L.LoongArkButton variant="outline">Cancel</L.LoongArkButton>
          <L.LoongArkButton>Create project</L.LoongArkButton>
        </L.LoongArkCardFooter>
      </L.LoongArkCard>
    </div>
  ),
};
