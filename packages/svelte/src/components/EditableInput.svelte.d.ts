import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditableInputProps } from "@ark-ui/svelte/editable";

export default class LoongArkEditableInput extends SvelteComponent<
  Omit<ComponentProps<typeof Editable.Input>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
