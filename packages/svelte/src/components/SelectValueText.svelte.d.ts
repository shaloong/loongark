import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectValueText extends SvelteComponent<
  ComponentProps<typeof Select.ValueText>,
  Record<string, never>,
  { default: Record<string, never> }
> {}
