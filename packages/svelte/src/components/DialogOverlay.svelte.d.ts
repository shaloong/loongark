import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";

export default class LoongArkDialogOverlay extends SvelteComponent<
  Omit<ComponentProps<typeof Dialog.Backdrop>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
