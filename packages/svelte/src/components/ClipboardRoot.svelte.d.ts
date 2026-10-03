import { SvelteComponent, type ComponentProps } from "svelte";
import { Clipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardRootProps } from "@ark-ui/svelte/clipboard";
import type { ClipboardSize } from "@loongark/primitives";

export default class LoongArkClipboardRoot extends SvelteComponent<
  Omit<ComponentProps<typeof Clipboard.Root>, "children" | "size"> & {
    size?: ClipboardSize;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
