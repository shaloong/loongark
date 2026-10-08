import { SvelteComponent, type ComponentProps } from "svelte";
import { CheckboxHiddenInput } from "@ark-ui/svelte/checkbox";

export default class LoongArkCheckboxHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof CheckboxHiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
