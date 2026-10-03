import { SvelteComponent, type ComponentProps } from "svelte";
import { NumberInput } from "@ark-ui/svelte/number-input";
import type { NumberInputSize } from "@loongark/primitives";

export default class LoongArkNumberInputValueText extends SvelteComponent<
  Omit<ComponentProps<typeof NumberInput.ValueText>, "children" | "size"> & {
    size?: NumberInputSize;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
