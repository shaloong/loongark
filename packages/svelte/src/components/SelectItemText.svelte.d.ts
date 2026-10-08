import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectItemText extends SvelteComponent<
  Omit<ComponentProps<typeof Select.ItemText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
