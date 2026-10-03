import { SvelteComponent, type ComponentProps } from "svelte";
import { NumberInput } from "@ark-ui/svelte/number-input";
import type { NumberInputRootProps } from "@ark-ui/svelte/number-input";
import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

export default class LoongArkNumberInputRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof NumberInput.Root>,
    | "children"
    | "size"
    | "state"
    | "value"
    | "defaultValue"
    | "min"
    | "max"
    | "step"
    | "disabled"
    | "readOnly"
    | "required"
    | "invalid"
    | "name"
    | "form"
    | "id"
    | "ids"
    | "inputMode"
    | "locale"
    | "formatOptions"
    | "translations"
    | "allowMouseWheel"
    | "allowOverflow"
    | "clampValueOnBlur"
    | "focusInputOnChange"
    | "spinOnPress"
    | "onValueChange"
    | "onValueInvalid"
    | "onFocusChange"
  > & {
    size?: NumberInputSize;
    state?: NumberInputState;
    value?: NumberInputRootProps["value"];
    defaultValue?: NumberInputRootProps["defaultValue"];
    min?: NumberInputRootProps["min"];
    max?: NumberInputRootProps["max"];
    step?: NumberInputRootProps["step"];
    disabled?: NumberInputRootProps["disabled"];
    readOnly?: NumberInputRootProps["readOnly"];
    required?: NumberInputRootProps["required"];
    invalid?: NumberInputRootProps["invalid"];
    name?: NumberInputRootProps["name"];
    form?: NumberInputRootProps["form"];
    id?: NumberInputRootProps["id"];
    ids?: NumberInputRootProps["ids"];
    inputMode?: NumberInputRootProps["inputMode"];
    locale?: NumberInputRootProps["locale"];
    formatOptions?: NumberInputRootProps["formatOptions"];
    translations?: NumberInputRootProps["translations"];
    allowMouseWheel?: NumberInputRootProps["allowMouseWheel"];
    allowOverflow?: NumberInputRootProps["allowOverflow"];
    clampValueOnBlur?: NumberInputRootProps["clampValueOnBlur"];
    focusInputOnChange?: NumberInputRootProps["focusInputOnChange"];
    spinOnPress?: NumberInputRootProps["spinOnPress"];
    onValueChange?: NumberInputRootProps["onValueChange"];
    onValueInvalid?: NumberInputRootProps["onValueInvalid"];
    onFocusChange?: NumberInputRootProps["onFocusChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
