import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";

export default class LoongArkAlertDialogRoot extends SvelteComponent<
  Omit<ComponentProps<typeof Dialog.Root>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
