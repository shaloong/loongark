import { SvelteComponent, type ComponentProps } from "svelte";
import { Clipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardInputProps } from "@ark-ui/svelte/clipboard";

export default class LoongArkClipboardInput extends SvelteComponent<
  Omit<ComponentProps<typeof Clipboard.Input>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
