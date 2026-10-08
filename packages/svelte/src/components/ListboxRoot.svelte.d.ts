import { SvelteComponent, type ComponentProps } from "svelte";
import type { ListboxRootProps } from "@ark-ui/svelte/listbox";
import { Listbox } from "@ark-ui/svelte/listbox";
import type { ListboxOrientation, ListboxSize } from "@loongark/primitives";

export default class LoongArkListboxRoot<
  T extends object = object,
> extends SvelteComponent<
  Omit<
    ListboxRootProps<T>,
    | "children"
    | "size"
    | "orientation"
    | "collection"
    | "defaultValue"
    | "value"
    | "multiple"
    | "disabled"
    | "loopFocus"
    | "id"
    | "onValueChange"
  > & {
    size?: ListboxSize;
    orientation?: ListboxOrientation;
    collection: ListboxRootProps<T>["collection"];
    defaultValue?: string[] | undefined;
    value?: string[] | undefined;
    multiple?: boolean | undefined;
    disabled?: boolean | undefined;
    loopFocus?: boolean | undefined;
    id?: string | undefined;
    onValueChange?: ((details: { value: string[] }) => void) | undefined;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
