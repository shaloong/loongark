import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectClearTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Select.ClearTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
