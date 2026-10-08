import { SvelteComponent, type ComponentProps } from "svelte";
import { RadioGroup } from "@ark-ui/svelte/radio-group";

export default class LoongArkRadioGroupItem extends SvelteComponent<
  Omit<
    ComponentProps<typeof RadioGroup.Item>,
    "children" | "value" | "disabled" | "invalid"
  > & { value: string; disabled?: boolean; invalid?: boolean },
  Record<string, never>,
  { default: Record<string, never> }
> {}
