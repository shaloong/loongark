import { SvelteComponent, type ComponentProps } from "svelte";
import { RadioGroup } from "@ark-ui/svelte/radio-group";

export default class LoongArkRadioGroupItemText extends SvelteComponent<
  Omit<ComponentProps<typeof RadioGroup.ItemText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
