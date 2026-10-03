import { SvelteComponent, type ComponentProps } from "svelte";
import { PinInput } from "@ark-ui/svelte/pin-input";
import type { PinInputPrimitiveProps } from "@loongark/primitives";

export default class LoongArkPinInputInput extends SvelteComponent<
  Omit<
    ComponentProps<typeof PinInput.Input>,
    "children" | "index" | "size" | "state" | "autoCapitalize"
  > & {
    index: number;
    size?: NonNullable<PinInputPrimitiveProps["size"]>;
    state?: NonNullable<PinInputPrimitiveProps["state"]>;
    autoCapitalize?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
