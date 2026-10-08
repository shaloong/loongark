import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectItemIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Select.ItemIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
