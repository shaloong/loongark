import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditableSubmitTriggerProps } from "@ark-ui/svelte/editable";

export default class LoongArkEditableSubmitTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Editable.SubmitTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
