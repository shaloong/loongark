import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectContent extends SvelteComponent<
  Omit<ComponentProps<typeof Select.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
