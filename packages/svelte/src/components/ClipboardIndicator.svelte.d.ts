import { SvelteComponent, type ComponentProps } from "svelte";
import { Clipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardIndicatorProps } from "@ark-ui/svelte/clipboard";

export default class LoongArkClipboardIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Clipboard.Indicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
