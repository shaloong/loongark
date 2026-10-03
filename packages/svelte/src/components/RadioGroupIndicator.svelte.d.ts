import { SvelteComponent, type ComponentProps } from "svelte";
import { RadioGroup } from "@ark-ui/svelte/radio-group";

export default class LoongArkRadioGroupIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof RadioGroup.Indicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
