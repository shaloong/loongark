import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditableAreaProps } from "@ark-ui/svelte/editable";

export default class LoongArkEditableArea extends SvelteComponent<
  Omit<ComponentProps<typeof Editable.Area>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
