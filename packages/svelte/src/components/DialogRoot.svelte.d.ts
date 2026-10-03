import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";

export default class LoongArkDialogRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Dialog.Root>,
    "children" | "open" | "onOpenChange"
  > & {
    open?: boolean | undefined;
    onOpenChange?: ((details: { open: boolean }) => void) | undefined;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
