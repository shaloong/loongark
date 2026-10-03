import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectList extends SvelteComponent<
  Omit<ComponentProps<typeof Select.List>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
