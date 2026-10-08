import { SvelteComponent, type ComponentProps } from "svelte";
import { RadioGroup } from "@ark-ui/svelte/radio-group";
import type {
  RadioGroupSize,
  RadioGroupOrientation,
} from "@loongark/primitives";

export default class LoongArkRadioGroupRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof RadioGroup.Root>,
    | "children"
    | "size"
    | "orientation"
    | "defaultValue"
    | "value"
    | "disabled"
    | "readOnly"
    | "name"
    | "form"
    | "onValueChange"
  > & {
    size?: RadioGroupSize;
    orientation?: RadioGroupOrientation;
    defaultValue?: string | undefined;
    value?: string | undefined;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string | undefined;
    form?: string | undefined;
    onValueChange?: ((details: { value: string | null }) => void) | undefined;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
