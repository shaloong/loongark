import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditableControlProps } from "@ark-ui/svelte/editable";

export default class LoongArkEditableControl extends SvelteComponent<
  Omit<ComponentProps<typeof Editable.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
