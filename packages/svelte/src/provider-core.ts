import type { Snippet } from "svelte";
import type { CreateThemeOptions } from "@loongark/theme";
import type { StyleBootstrap } from "@loongark/primitives/styles";
export interface LoongArkProviderCoreProps extends CreateThemeOptions {
  children?: Snippet;
  styleBootstrap?: StyleBootstrap;
}
export { default as LoongArkProviderCore } from "./components/ProviderCore.svelte";
