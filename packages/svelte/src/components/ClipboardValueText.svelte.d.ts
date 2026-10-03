import { SvelteComponent, type ComponentProps } from "svelte";
import { Clipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardValueTextProps } from "@ark-ui/svelte/clipboard";

export default class LoongArkClipboardValueText extends SvelteComponent<
  Omit<ComponentProps<typeof Clipboard.ValueText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
