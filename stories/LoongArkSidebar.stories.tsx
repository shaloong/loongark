import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Sidebar",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkSidebarProvider defaultOpen>
        <L.LoongArkSidebarTrigger>Toggle sidebar</L.LoongArkSidebarTrigger>
        <L.LoongArkSidebarPanel>
          <L.LoongArkSidebar>
            <L.LoongArkSidebarHeader>Workspace</L.LoongArkSidebarHeader>
            <L.LoongArkSidebarContent>
              <L.LoongArkSidebarGroup>
                <L.LoongArkSidebarGroupLabel>
                  Projects
                </L.LoongArkSidebarGroupLabel>
                <L.LoongArkSidebarMenu>
                  <L.LoongArkSidebarMenuItem>
                    <L.LoongArkSidebarMenuButton>
                      Overview
                    </L.LoongArkSidebarMenuButton>
                  </L.LoongArkSidebarMenuItem>
                </L.LoongArkSidebarMenu>
              </L.LoongArkSidebarGroup>
            </L.LoongArkSidebarContent>
            <L.LoongArkSidebarFooter>Settings</L.LoongArkSidebarFooter>
          </L.LoongArkSidebar>
        </L.LoongArkSidebarPanel>
      </L.LoongArkSidebarProvider>
    </div>
  ),
};
