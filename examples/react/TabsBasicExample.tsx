import React from "react";
import {
  LoongArkTabsRoot,
  LoongArkTabsList,
  LoongArkTabsTrigger,
  LoongArkTabsContent,
} from "@loongark/react";
export function TabsBasicExample() {
  return (
    <LoongArkTabsRoot defaultValue="overview">
      <LoongArkTabsList>
        <LoongArkTabsTrigger value="overview">概览</LoongArkTabsTrigger>
        <LoongArkTabsTrigger value="api">API</LoongArkTabsTrigger>
      </LoongArkTabsList>
      <LoongArkTabsContent value="overview">组件概览</LoongArkTabsContent>
      <LoongArkTabsContent value="api">组件的公开 API</LoongArkTabsContent>
    </LoongArkTabsRoot>
  );
}
