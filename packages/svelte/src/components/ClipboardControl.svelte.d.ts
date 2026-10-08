import { SvelteComponent, type ComponentProps } from "svelte";
import { Clipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardControlProps } from "@ark-ui/svelte/clipboard";

export default class LoongArkClipboardControl extends SvelteComponent<
  Omit<ComponentProps<typeof Clipboard.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
