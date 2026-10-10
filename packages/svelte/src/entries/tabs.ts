// 由 scripts/generate-entries.mjs 生成；只导出本组件族的公开能力。
export { default as LoongArkTabsContent } from "../components/TabsContent.svelte";
export { LoongArkTabsContext } from "../components/ark-advanced";
export { default as LoongArkTabsIndicator } from "../components/TabsIndicator.svelte";
export { default as LoongArkTabsList } from "../components/TabsList.svelte";
export { default as LoongArkTabsRoot } from "../components/TabsRoot.svelte";
export { LoongArkTabsRootProvider } from "../components/ark-advanced";
export { default as LoongArkTabsTrigger } from "../components/TabsTrigger.svelte";
export type { TabsContentProps } from "../components/tabs.d";
export type { TabsIndicatorProps } from "../components/tabs.d";
export type { TabsListProps } from "../components/tabs.d";
export type { TabsRootProps } from "../components/tabs.d";
export type { TabsTriggerProps } from "../components/tabs.d";
export { useTabs } from "@ark-ui/svelte/tabs";
export { useTabsContext } from "@ark-ui/svelte/tabs";
export type { UseTabsProps } from "@ark-ui/svelte/tabs";
export type { UseTabsReturn } from "@ark-ui/svelte/tabs";
