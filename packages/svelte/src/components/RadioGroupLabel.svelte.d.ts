import { SvelteComponent, type ComponentProps } from "svelte";
import { RadioGroup } from "@ark-ui/svelte/radio-group";

export default class LoongArkRadioGroupLabel extends SvelteComponent<
  Omit<ComponentProps<typeof RadioGroup.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
