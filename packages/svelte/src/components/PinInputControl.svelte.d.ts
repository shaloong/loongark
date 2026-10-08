import { SvelteComponent, type ComponentProps } from "svelte";
import { PinInput } from "@ark-ui/svelte/pin-input";
import type { PinInputPrimitiveProps } from "@loongark/primitives";

export default class LoongArkPinInputControl extends SvelteComponent<
  Omit<ComponentProps<typeof PinInput.Control>, "children" | "size"> & {
    size?: NonNullable<PinInputPrimitiveProps["size"]>;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
