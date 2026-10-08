import { SvelteComponent, type ComponentProps } from "svelte";
import { Clipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardTriggerProps } from "@ark-ui/svelte/clipboard";

export default class LoongArkClipboardTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Clipboard.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
