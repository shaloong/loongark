import { SvelteComponent, type ComponentProps } from "svelte";
import { PinInput } from "@ark-ui/svelte/pin-input";
import type { PinInputPrimitiveProps } from "@loongark/primitives";

export default class LoongArkPinInputRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof PinInput.Root>,
    | "children"
    | "size"
    | "state"
    | "disabled"
    | "value"
    | "defaultValue"
    | "onValueChange"
    | "onValueComplete"
    | "type"
    | "mask"
    | "otp"
    | "placeholder"
  > & {
    size?: NonNullable<PinInputPrimitiveProps["size"]>;
    state?: NonNullable<PinInputPrimitiveProps["state"]>;
    disabled?: boolean;
    value?: string[] | undefined;
    defaultValue?: string[] | undefined;
    onValueChange?:
      | ((details: { value: string[]; valueAsString: string }) => void)
      | undefined;
    onValueComplete?:
      | ((details: { value: string[]; valueAsString: string }) => void)
      | undefined;
    type?: "alphanumeric" | "numeric" | "alphabetic" | undefined;
    mask?: boolean | undefined;
    otp?: boolean | undefined;
    placeholder?: string | undefined;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
