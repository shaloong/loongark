import { SvelteComponent, type ComponentProps } from "svelte";
import { Field } from "@ark-ui/svelte/field";
import type { InputPrimitiveProps } from "@loongark/primitives";

export default class LoongArkInputInput extends SvelteComponent<
  Omit<
    ComponentProps<typeof Field.Textarea>,
    | "children"
    | "size"
    | "state"
    | "multiline"
    | "type"
    | "placeholder"
    | "disabled"
    | "readOnly"
    | "required"
    | "name"
    | "value"
  > & {
    size?: NonNullable<InputPrimitiveProps["size"]>;
    state?: NonNullable<InputPrimitiveProps["state"]>;
    multiline?: boolean;
    type?: string;
    placeholder?: string | undefined;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    name?: string | undefined;
    value?: string | undefined;
  },
  { input: Event; change: Event },
  { default: Record<string, never> }
> {}
