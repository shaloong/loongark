import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditableRootProps } from "@ark-ui/svelte/editable";
import type { EditableSize, EditableState } from "@loongark/primitives";

export default class LoongArkEditableRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Editable.Root>,
    "children" | "size" | "state" | "disabled"
  > & {
    size?: EditableSize;
    state?: EditableState;
    disabled?: EditableRootProps["disabled"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
