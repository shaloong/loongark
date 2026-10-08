import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectHiddenSelect extends SvelteComponent<
  Omit<ComponentProps<typeof Select.HiddenSelect>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
