import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Select.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
