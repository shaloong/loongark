import { SvelteComponent, type ComponentProps } from "svelte";
import { Field } from "@ark-ui/svelte/field";
import type { InputPrimitiveProps } from "@loongark/primitives";

export default class LoongArkInputRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Field.Root>,
    | "children"
    | "size"
    | "state"
    | "disabled"
    | "readOnly"
    | "multiline"
    | "variant"
    | "hasValue"
  > & {
    size?: NonNullable<InputPrimitiveProps["size"]>;
    state?: NonNullable<InputPrimitiveProps["state"]>;
    disabled?: boolean;
    readOnly?: boolean;
    multiline?: boolean;
    variant?: "default" | "floating";
    hasValue?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
