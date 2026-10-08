import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectItemGroupLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Select.ItemGroupLabel>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
