import { SvelteComponent, type ComponentProps } from "svelte";
import { Clipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardLabelProps } from "@ark-ui/svelte/clipboard";

export default class LoongArkClipboardLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Clipboard.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
