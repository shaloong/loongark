import { SvelteComponent, type ComponentProps } from "svelte";
import { NumberInput } from "@ark-ui/svelte/number-input";
import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

export default class LoongArkNumberInputInput extends SvelteComponent<
  Omit<
    ComponentProps<typeof NumberInput.Input>,
    "children" | "size" | "state" | "disabled" | "readOnly"
  > & {
    size?: NumberInputSize;
    state?: NumberInputState;
    disabled?: boolean;
    readOnly?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
