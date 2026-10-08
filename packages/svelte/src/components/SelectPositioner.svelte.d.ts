import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectPositioner extends SvelteComponent<
  Omit<ComponentProps<typeof Select.Positioner>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
