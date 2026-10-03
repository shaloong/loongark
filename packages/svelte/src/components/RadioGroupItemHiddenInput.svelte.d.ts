import { SvelteComponent, type ComponentProps } from "svelte";
import { RadioGroup } from "@ark-ui/svelte/radio-group";

export default class LoongArkRadioGroupItemHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof RadioGroup.ItemHiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
