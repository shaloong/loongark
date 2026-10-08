import { SvelteComponent, type ComponentProps } from "svelte";
import { RadioGroup } from "@ark-ui/svelte/radio-group";

export default class LoongArkRadioGroupItemControl extends SvelteComponent<
  Omit<ComponentProps<typeof RadioGroup.ItemControl>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
