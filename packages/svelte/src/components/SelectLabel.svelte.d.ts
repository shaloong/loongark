import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Select.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
