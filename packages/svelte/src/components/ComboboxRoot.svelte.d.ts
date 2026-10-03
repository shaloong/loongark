import { SvelteComponent, type ComponentProps } from "svelte";
import type { ComboboxRootProps } from "@ark-ui/svelte/combobox";
import { Combobox } from "@ark-ui/svelte/combobox";
import type { ComboboxSize } from "@loongark/primitives";

export default class LoongArkComboboxRoot<
  T extends object = object,
> extends SvelteComponent<
  Omit<
    ComboboxRootProps<T>,
    | "children"
    | "size"
    | "collection"
    | "closeOnSelect"
    | "composite"
    | "defaultHighlightedValue"
    | "defaultOpen"
    | "defaultValue"
    | "defaultInputValue"
    | "unselectable"
    | "disabled"
    | "form"
    | "highlightedValue"
    | "id"
    | "ids"
    | "immediate"
    | "inputValue"
    | "invalid"
    | "lazyMount"
    | "loopFocus"
    | "multiple"
    | "name"
    | "onInputValueChange"
    | "onValueChange"
    | "open"
    | "positioning"
    | "present"
    | "readOnly"
    | "required"
    | "skipAnimationOnMount"
    | "unmountOnExit"
    | "value"
  > & {
    size?: ComboboxSize;
    collection: ComboboxRootProps<T>["collection"];
    closeOnSelect?: boolean;
    composite?: boolean;
    defaultHighlightedValue?: string | undefined;
    defaultOpen?: boolean | undefined;
    defaultValue?: string[] | undefined;
    defaultInputValue?: string | undefined;
    unselectable?: "on" | "off" | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    highlightedValue?: string | undefined;
    id?: string | undefined;
    ids?: ComboboxRootProps<T>["ids"];
    immediate?: boolean | undefined;
    inputValue?: string | undefined;
    invalid?: boolean | undefined;
    lazyMount?: boolean;
    loopFocus?: boolean;
    multiple?: boolean | undefined;
    name?: string | undefined;
    onInputValueChange?:
      ((details: { inputValue: string }) => void) | undefined;
    onValueChange?: ((details: { value: string[] }) => void) | undefined;
    open?: boolean | undefined;
    positioning?: ComboboxRootProps<T>["positioning"];
    present?: boolean | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    skipAnimationOnMount?: boolean;
    unmountOnExit?: boolean;
    value?: string[] | undefined;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
