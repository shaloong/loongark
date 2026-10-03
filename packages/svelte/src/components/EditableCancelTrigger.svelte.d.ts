import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditableCancelTriggerProps } from "@ark-ui/svelte/editable";

export default class LoongArkEditableCancelTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Editable.CancelTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
