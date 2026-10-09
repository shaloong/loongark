/** @jsxImportSource solid-js */

import {
  LoongArkSidebar,
  LoongArkSidebarHeader,
  LoongArkSidebarContent,
  LoongArkSidebarMenu,
  LoongArkSidebarMenuItem,
  LoongArkSidebarMenuButton,
} from "@loongark/solid";
export function SidebarBasicExample() {
  return (
    <LoongArkSidebar>
      <LoongArkSidebarHeader>工作区</LoongArkSidebarHeader>
      <LoongArkSidebarContent>
        <LoongArkSidebarMenu>
          <LoongArkSidebarMenuItem>
            <LoongArkSidebarMenuButton>概览</LoongArkSidebarMenuButton>
          </LoongArkSidebarMenuItem>
          <LoongArkSidebarMenuItem>
            <LoongArkSidebarMenuButton>设置</LoongArkSidebarMenuButton>
          </LoongArkSidebarMenuItem>
        </LoongArkSidebarMenu>
      </LoongArkSidebarContent>
    </LoongArkSidebar>
  );
}
