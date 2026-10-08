import { SvelteComponent, type ComponentProps } from "svelte";
import { NumberInput } from "@ark-ui/svelte/number-input";
import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

export default class LoongArkNumberInputIncrementTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof NumberInput.IncrementTrigger>,
    "children" | "size" | "state" | "disabled"
  > & { size?: NumberInputSize; state?: NumberInputState; disabled?: boolean },
  Record<string, never>,
  { default: Record<string, never> }
> {}
