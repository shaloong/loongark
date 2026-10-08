import { SvelteComponent, type ComponentProps } from "svelte";
import { CheckboxLabel } from "@ark-ui/svelte/checkbox";

export default class LoongArkCheckboxLabel extends SvelteComponent<
  Omit<ComponentProps<typeof CheckboxLabel>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
