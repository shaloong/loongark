import { SvelteComponent, type ComponentProps } from "svelte";
import type { SelectRootProps } from "@ark-ui/svelte/select";
import { Select } from "@ark-ui/svelte/select";
import type { SelectSize } from "@loongark/primitives";

export default class LoongArkSelectRoot<
  T extends object = object,
> extends SvelteComponent<
  Omit<
    SelectRootProps<T>,
    | "children"
    | "size"
    | "collection"
    | "closeOnSelect"
    | "composite"
    | "defaultHighlightedValue"
    | "defaultOpen"
    | "defaultValue"
    | "deselectable"
    | "disabled"
    | "form"
    | "highlightedValue"
    | "id"
    | "ids"
    | "immediate"
    | "invalid"
    | "lazyMount"
    | "loopFocus"
    | "multiple"
    | "name"
    | "open"
    | "positioning"
    | "present"
    | "readOnly"
    | "required"
    | "scrollToIndexFn"
    | "skipAnimationOnMount"
    | "unmountOnExit"
    | "value"
  > & {
    size?: SelectSize;
    collection: SelectRootProps<T>["collection"];
    closeOnSelect?: boolean;
    composite?: boolean;
    defaultHighlightedValue?: string | undefined;
    defaultOpen?: boolean | undefined;
    defaultValue?: string[] | undefined;
    deselectable?: boolean | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    highlightedValue?: string | undefined;
    id?: string | undefined;
    ids?: SelectRootProps<T>["ids"];
    immediate?: boolean | undefined;
    invalid?: boolean | undefined;
    lazyMount?: boolean;
    loopFocus?: boolean;
    multiple?: boolean | undefined;
    name?: string | undefined;
    open?: boolean | undefined;
    positioning?: SelectRootProps<T>["positioning"];
    present?: boolean | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    scrollToIndexFn?: SelectRootProps<T>["scrollToIndexFn"];
    skipAnimationOnMount?: boolean;
    unmountOnExit?: boolean;
    value?: string[] | undefined;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
