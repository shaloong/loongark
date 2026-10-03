import type { SvelteComponent } from "svelte";
import type { CreateThemeOptions } from "@loongark/theme";
export default class Provider extends SvelteComponent<
  CreateThemeOptions,
  Record<string, never>,
  { default: Record<string, never> }
> {}
