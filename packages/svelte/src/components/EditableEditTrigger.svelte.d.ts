import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditableEditTriggerProps } from "@ark-ui/svelte/editable";

export default class LoongArkEditableEditTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Editable.EditTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
