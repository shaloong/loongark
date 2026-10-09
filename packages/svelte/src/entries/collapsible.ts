// 由 scripts/generate-entries.mjs 生成；只导出本组件族的公开能力。
export type { CollapsibleContentProps } from "../components/collapsible.d";
export type { CollapsibleIndicatorProps } from "../components/collapsible.d";
export type { CollapsibleRootProps } from "../components/collapsible.d";
export type { CollapsibleTriggerProps } from "../components/collapsible.d";
export { default as LoongArkCollapsibleContent } from "../components/CollapsibleContent.svelte";
export { LoongArkCollapsibleContext } from "../components/ark-advanced";
export { default as LoongArkCollapsibleIndicator } from "../components/CollapsibleIndicator.svelte";
export { default as LoongArkCollapsibleRoot } from "../components/CollapsibleRoot.svelte";
export { LoongArkCollapsibleRootProvider } from "../components/ark-advanced";
export { default as LoongArkCollapsibleTrigger } from "../components/CollapsibleTrigger.svelte";
export { useCollapsible } from "@ark-ui/svelte/collapsible";
export { useCollapsibleContext } from "@ark-ui/svelte/collapsible";
export type { UseCollapsibleProps } from "@ark-ui/svelte/collapsible";
export type { UseCollapsibleReturn } from "@ark-ui/svelte/collapsible";
