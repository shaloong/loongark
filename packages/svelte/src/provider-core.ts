import type { Snippet } from "svelte";
import type { CreateThemeOptions } from "@shaloong/loongark-theme";
import type { StyleBootstrap } from "@shaloong/loongark-primitives/styles";
export interface LoongArkProviderCoreProps extends CreateThemeOptions {
  children?: Snippet;
  styleBootstrap?: StyleBootstrap;
}
export { default as LoongArkProviderCore } from "./components/ProviderCore.svelte";
