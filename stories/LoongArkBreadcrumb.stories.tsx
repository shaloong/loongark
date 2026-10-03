import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Breadcrumb",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkBreadcrumb>
        <L.LoongArkBreadcrumbList>
          <L.LoongArkBreadcrumbItem>
            <L.LoongArkBreadcrumbLink href="#home">
              Home
            </L.LoongArkBreadcrumbLink>
          </L.LoongArkBreadcrumbItem>
          <L.LoongArkBreadcrumbSeparator />
          <L.LoongArkBreadcrumbItem>
            <L.LoongArkBreadcrumbPage>Components</L.LoongArkBreadcrumbPage>
          </L.LoongArkBreadcrumbItem>
        </L.LoongArkBreadcrumbList>
      </L.LoongArkBreadcrumb>
    </div>
  ),
};
