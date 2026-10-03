import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditableLabelProps } from "@ark-ui/svelte/editable";

export default class LoongArkEditableLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Editable.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
