import type { SvelteComponent } from "svelte";
import type { PinInputPrimitiveProps } from "@loongark/primitives";

export default class PinInputRoot extends SvelteComponent<{
  size?: NonNullable<PinInputPrimitiveProps["size"]>;
  state?: NonNullable<PinInputPrimitiveProps["state"]>;
  disabled?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (details: { value: string[]; valueAsString: string }) => void;
  onValueComplete?: (details: {
    value: string[];
    valueAsString: string;
  }) => void;
  type?: "alphanumeric" | "numeric" | "alphabetic";
  mask?: boolean;
  otp?: boolean;
  placeholder?: string;
}> {}
