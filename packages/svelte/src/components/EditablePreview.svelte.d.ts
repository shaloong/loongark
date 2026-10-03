import { SvelteComponent, type ComponentProps } from "svelte";
import { Editable } from "@ark-ui/svelte/editable";
import type { EditablePreviewProps } from "@ark-ui/svelte/editable";

export default class LoongArkEditablePreview extends SvelteComponent<
  Omit<ComponentProps<typeof Editable.Preview>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
